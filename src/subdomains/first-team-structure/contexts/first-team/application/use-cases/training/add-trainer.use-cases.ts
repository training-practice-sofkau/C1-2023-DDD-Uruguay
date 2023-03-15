import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from 'src/libs';
import { AgeValueObject, CountryValueObject, FullNameValueObject, IAddedTrainerResponse, IAddTrainerCommand, ITrainerDomainEntity, ITrainingDomainService, SpecialtyValueObject, TrainerDomainEntity } from '../../../domain';
import { TrainingAggregate } from '../../../domain/aggregates/training.aggregate';
import { AddedTrainerEventPublisher, AddedTrainingFieldEventPublisher } from '../../../domain/events/publishers/training';

export class AddTrainerUseCases<
    Command extends IAddTrainerCommand,
    Response extends IAddedTrainerResponse
>
extends ValueObjectErrorHandler
implements IUseCase<Command, Response>
{
    private readonly trainingAggregate: TrainingAggregate;

    constructor(
        private readonly trainingService: ITrainingDomainService,
        private readonly addedTrainerEventPublisher: AddedTrainerEventPublisher,
    ) {
        super();
        this.trainingAggregate = new TrainingAggregate({trainingService, addedTrainerEventPublisher})
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return {success: data ? true : false, data} as Response
    }

    executeCommand(command: Command): Promise<TrainerDomainEntity | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);

        const entity = this.createEntityTrainerDomain(ValueObject);

        return this.executeTrainingAggregateRoot(entity)
    }
    
    createValueObject(command: Command): ITrainerDomainEntity {
        const fullName = new FullNameValueObject(command.fullName.valueOf());
        const age = new AgeValueObject(command.age);
        const country = new CountryValueObject(command.country);
        const specialty = new SpecialtyValueObject(command.specialty);

        return {fullName, age, country, specialty}
    }
    
    validateValueObject(valueObject: ITrainerDomainEntity): void {
        const {
            fullName,
            age,
            country,
            specialty
        } = valueObject;

        if(fullName instanceof FullNameValueObject && fullName.hasErrors()) this.setErrors(fullName.getErrors());
        
        if(age instanceof AgeValueObject && age.hasErrors()) this.setErrors(age.getErrors());
        
        if(country instanceof CountryValueObject && country.hasErrors()) this.setErrors(country.getErrors());
        
        if(specialty instanceof SpecialtyValueObject && specialty.hasErrors()) this.setErrors(specialty.getErrors());

        if(this.hasErrors() === true) throw new ValueObjectException(
            'AddTrainerUseCase got some errors',
            this.getErrors(),
        );
    }

    createEntityTrainerDomain(valueObject: ITrainerDomainEntity): TrainerDomainEntity {
        const {
            fullName,
            age,
            country,
            specialty
        } = valueObject;

        return new TrainerDomainEntity({
            fullName: fullName.valueOf(),
            age: age.valueOf(),
            country: country.valueOf(),
            specialty: specialty.valueOf(),
        })
    }

    executeTrainingAggregateRoot(entity: TrainerDomainEntity): Promise<TrainerDomainEntity | null> {
        return this.trainingAggregate.addTrainer(entity);
    }
}
