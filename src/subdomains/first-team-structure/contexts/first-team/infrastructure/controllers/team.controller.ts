import { Controller } from '@nestjs/common';
import { Body, Patch, Post } from '@nestjs/common/decorators';
import { AddCoachUseCases, AddPlayerUseCases, GetCoachUseCase, GetTeamUseCase, RegisterTeamUseCases, UpdateCoachWageUseCases, UpdatePlayerPositionUseCases, UpdatePlayerWageUseCases } from '../../application';
import { IAddCoachCommand, IAddPlayerCommand, IGetCoachCommand, IGetTeamCommand, IGotCoachResponse, IGotTeamReponse, IRegisterTeamCommand, IUpdateCoachWageCommand, IUpdatePlayerPositionCommand, IUpdatePlayerWageCommand } from '../../domain';
import { AddedCoachPublisher } from '../messaging/publisher/team/coach-added.message-publisher';
import { UpdatedCoachWagePublisher } from '../messaging/publisher/team/coach-wage-updated.message-publisher';
import { AddedPlayerPublisher } from '../messaging/publisher/team/player-added.message-publisher';
import { UpdatedPlayerPositionPublisher } from '../messaging/publisher/team/player-position-updated.message-publisher';
import { UpdatedPlayerWagePublisher } from '../messaging/publisher/team/player-wage-updated.message-publisher';
import { RegisteredTeamPublisher } from '../messaging/publisher/team/team-registered.message-publisher';
import { CoachService } from '../persistence/services/team/coach.service';
import { PlayerService } from '../persistence/services/team/player.service';
import { TeamService } from '../persistence/services/team/team.service';
@Controller('team')
export class TeamController {

    constructor(
        readonly teamService: TeamService,
        readonly coachService: CoachService,
        readonly playerService: PlayerService,
        readonly registeredTeamPublisher: RegisteredTeamPublisher,
        readonly addedCoachPublisher: AddedCoachPublisher,
        readonly addedPlayerPublisher: AddedPlayerPublisher,
        readonly updatedCoachWagePublisher: UpdatedCoachWagePublisher,
        readonly updatedPlayerWagePublisher: UpdatedPlayerWagePublisher,
        readonly updatedPlayerPositionPublisher: UpdatedPlayerPositionPublisher,
        private readonly getTeamUseCase: GetTeamUseCase<IGetTeamCommand, IGotTeamReponse>,
        private readonly getCoach: GetCoachUseCase<IGetCoachCommand, IGotCoachResponse>,
    ) {}

    @Post('add-coach')
    async addCoach(@Body() coach: IAddCoachCommand) {
        const useCase = new AddCoachUseCases(
            this.teamService,
            this.addedCoachPublisher
        );

        return await useCase.execute(coach)
    }

    @Post('add-player')
    async addPlayer(@Body() player: IAddPlayerCommand) {
        const useCase = new AddPlayerUseCases(
            this.teamService,
            this.addedPlayerPublisher,
            this.getTeamUseCase
        );

        return await useCase.execute(player)
    }

    @Post('register-team')
    async registerTeam(@Body() team: IRegisterTeamCommand) {
        const useCase = new RegisterTeamUseCases(
            this.getCoach,
            this.teamService,
            this.registeredTeamPublisher,
        );

        return await useCase.execute(team)
    }

    @Patch('update-coach-wage')
    updateCoachWage(@Body() wage: IUpdateCoachWageCommand) {
        const useCase = new UpdateCoachWageUseCases(
            this.coachService,
            this.updatedCoachWagePublisher
        )

        return useCase.execute(wage);
    }

    @Patch('update-player-wage')
    updatePlayerWage(@Body() wage: IUpdatePlayerWageCommand) {
        const useCase = new UpdatePlayerWageUseCases(
            this.playerService,
            this.updatedPlayerWagePublisher
        )

        return useCase.execute(wage);
    }

    @Patch('update-player-position')
    updatePlayerPosition(@Body() position: IUpdatePlayerPositionCommand) {
        const useCase = new UpdatePlayerPositionUseCases(
            this.playerService,
            this.updatedPlayerPositionPublisher
        )

        return useCase.execute(position);
    }
}