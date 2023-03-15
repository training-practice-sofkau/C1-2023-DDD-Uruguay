import { DurationValueObject, IGetTeamCommand, IGetTrainerCommand, IGetWorkoutsCommand, IGotTeamReponse, IGotTrainerResponse, IRegisteredTrainingResponse, IRegisterTrainingCommand, ITrainerDomainEntity, ITrainingDomainEntity, ITrainingDomainService, ITrainingEquipmentDomainEntity, ITrainingFieldDomainEntity, IWorkoutDomainEntity, NameValueObject } from "../../../domain";
import { ValueObjectErrorHandler } from '../../../../../../../libs/sofka/bases/value-object-error-handler.base';
import { IUseCase, ValueObjectException } from "src/libs";
import { TrainingAggregate } from '../../../domain/aggregates/training.aggregate';
import { TrainingDomainEntity } from '../../../domain/entities/training.domain-entity';
import { ITeamDomainEntity } from '../../../domain/entities/interfaces/team.domain-entity.interface';
import { GetTeamUseCase } from "../team/get-team.use-cases";
import { GetTrainingFieldUseCase } from './get-training-field.use-cases';
import { IGetTrainingFieldCommand } from '../../../domain/interfaces/commands/training/get-training-field.command';
import { IGotTrainingFieldResponse } from '../../../domain/interfaces/responses/training/got-training-field.response';
import { GetTrainingEquipments } from './get-training-equipment.use-cases';
import { IGetTrainingEquipmentsCommand } from '../../../domain/interfaces/commands/training/get-training-equipment.command';
import { IGotTrainingEquipmentsResponse } from '../../../domain/interfaces/responses/training/got-training-equipment.response';
import { GetTrainerUseCase } from './get-trainer.use-cases';
import { GetWorkoutUseCase } from "./get-workout.use-cases";
import { IGotWorkoutsResponse } from '../../../domain/interfaces/responses/training/got-workout.response';
import { RegisteredTrainingEventPublisher } from "../../../domain/events/publishers/training";

export class RegisterTrainingUseCases<
    Command extends IRegisterTrainingCommand,
    Response extends IRegisteredTrainingResponse
>
extends ValueObjectErrorHandler
implements IUseCase<Command, Response>
{
    private readonly trainingAggregate: TrainingAggregate;

    constructor(
        private readonly getTeam: GetTeamUseCase<IGetTeamCommand, IGotTeamReponse>,
        private readonly getTrainingField: GetTrainingFieldUseCase<IGetTrainingFieldCommand, IGotTrainingFieldResponse>,
        private readonly getTrainer: GetTrainerUseCase<IGetTrainerCommand, IGotTrainerResponse>,
        private readonly trainingService: ITrainingDomainService,
        private readonly registeredTrainingEventPublisher: RegisteredTrainingEventPublisher,
    ) {
        super();
        this.trainingAggregate = new TrainingAggregate({trainingService, registeredTrainingEventPublisher})
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return {success: data ? true : false, data } as Response
    }

    executeCommand(command: Command): Promise<TrainingDomainEntity | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);

        const entity = this.createEntityTrainingDomain(ValueObject);

        return this.executeTrainingAggregateRoot(entity)
    }
    
    createValueObject(command: Command): ITrainingDomainEntity {
        let team: ITeamDomainEntity;
        let trainingField: ITrainingFieldDomainEntity;
        let trainingEquipments: ITrainingEquipmentDomainEntity[];
        let trainer: ITrainerDomainEntity;
        let workouts: IWorkoutDomainEntity[];
        let name = new NameValueObject(command.name)
        let duration = new DurationValueObject(command.duration);
        
        this.getTeam.execute({teamId: command.teamId})
        .then((iTeam) => team = iTeam.data);
        this.getTrainingField.execute({trainingFieldId: command.trainingField})
        .then((iTrainingField) => trainingField = iTrainingField.data);
        this.getTrainer.execute({trainerId: command.trainerId})
        .then((iTrainer) => trainer = iTrainer.data);

        return {team, trainingField, trainer, name, duration}
    }
    
    validateValueObject(valueObject: ITrainingDomainEntity): void {
        const {
            name,
            duration
        } = valueObject;

        if(name instanceof NameValueObject && name.hasErrors()) this.setErrors(name.getErrors());

        if(duration instanceof DurationValueObject && duration.hasErrors()) this.setErrors(duration.getErrors());

        if(this.hasErrors() === true) throw new ValueObjectException(
            'RegisterTrainingUseCase got some errors',
            this.getErrors(),
        );
    }

    createEntityTrainingDomain(valueObject: ITrainingDomainEntity): TrainingDomainEntity {
        const {
            duration,
            team,
            trainingField,
            name,
            trainer,
        } = valueObject;

        return new TrainingDomainEntity({
            duration,
            team,
            trainingField,
            name,
            trainer,
        })
    }

    executeTrainingAggregateRoot(entity: TrainingDomainEntity): Promise<TrainingDomainEntity | null> {
        return this.trainingAggregate.registerTraining(entity);
    }
}
