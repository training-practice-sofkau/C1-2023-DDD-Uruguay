import { IGetPlayersCommand, IRegisteredTeamResponse, IRegisterTeamCommand, ITeamDomainEntity, ITeamDomainService, NameValueObject, RegisteredTeamEventPublisher, TeamAggregate, TeamDomainEntity, TownValueObject } from "../../../domain";
import { ValueObjectErrorHandler } from '../../../../../../../libs/sofka/bases/value-object-error-handler.base';
import { IUseCase, ValueObjectException } from "src/libs";
import { ICoachDomainEntity } from '../../../domain/entities/interfaces/team/coach.domain-entity.interface';
import { GetPlayersUseCase } from "./get-players.use-cases";
import { IGotPlayersResponse } from '../../../domain/interfaces/responses/team/got-players.response';
import { GetCoachUseCase } from "./get-coach.use-cases";
import { IGetCoachCommand } from '../../../domain/interfaces/commands/team/get-coach.command';
import { IGotCoachResponse } from '../../../domain/interfaces/responses/team/got-coach.response';

export class RegisterTeamUseCases<
    Command extends IRegisterTeamCommand,
    Response extends IRegisteredTeamResponse
>
extends ValueObjectErrorHandler
implements IUseCase<Command, Response>
{
    private readonly teamAggregate: TeamAggregate;

    constructor(
        private readonly getCoach: GetCoachUseCase<IGetCoachCommand, IGotCoachResponse>,
        private readonly teamService: ITeamDomainService,
        private readonly registeredTeamEventPublisher: RegisteredTeamEventPublisher,
    ) {
        super();
        this.teamAggregate = new TeamAggregate({teamService, registeredTeamEventPublisher})
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return {success: data ? true : false, data} as Response
    }

    executeCommand(command: Command): Promise<TeamDomainEntity | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);

        const entity = this.createEntityTeamDomain(ValueObject);

        return this.executeMatchAggregateRoot(entity)
    }
    
    createValueObject(command: Command): ITeamDomainEntity {
        let coach: ICoachDomainEntity;
        let name = new NameValueObject(command.name)
        let town = new TownValueObject(command.town);
        
        this.getCoach.execute({coachId: command.coachId})
        .then((iCoach) => coach = iCoach.data);

        return {coach, name, town}
    }
    
    validateValueObject(valueObject: ITeamDomainEntity): void {
        const {
            name,
            town
        } = valueObject;

        if(name instanceof NameValueObject && name.hasErrors()) this.setErrors(name.getErrors());

        if(town instanceof TownValueObject && town.hasErrors()) this.setErrors(town.getErrors());

        if(this.hasErrors() === true) throw new ValueObjectException(
            'RegisterTeamUseCase got some errors',
            this.getErrors(),
        );
    }

    createEntityTeamDomain(valueObject: ITeamDomainEntity): TeamDomainEntity {
        const {
            coach,
            name,
            town,
        } = valueObject;

        return new TeamDomainEntity({
            coach,
            name,
            town,
        })
    }

    executeMatchAggregateRoot(entity: TeamDomainEntity): Promise<TeamDomainEntity | null> {
        return this.teamAggregate.registerTeam(entity);
    }
}
