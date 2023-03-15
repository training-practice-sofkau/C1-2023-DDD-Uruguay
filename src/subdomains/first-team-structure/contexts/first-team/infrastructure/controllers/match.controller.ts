import { Body, Controller, Post, Patch } from '@nestjs/common';
import { AddRivalUseCase } from '../../application/use-cases/match/add-rival.use-cases';
import { IAddRivalCommand, IAddStadiumCommand, IGetRivalCommand, IGetStadiumCommand, IGetTeamCommand, IGotRivalResponse, IGotStadiumResponse, IGotTeamReponse, IRegisterMatchCommand, IUpdateDateCommand, IUpdateRivalTownCommand, IUpdateStadiumCapacity, IUpdateStadiumSquareMeters } from '../../domain';
import { MatchService } from '../persistence/services/match/match.service';
import { AddedRivalPublisher } from '../messaging/publisher/match/rival-added.message-publisher';
import { AddStadiumUseCases, GetRivalUseCases, GetStadiumUseCase, GetTeamUseCase, RegisterMatchUseCases, UpdateDateUseCases, UpdateRivalTownUseCases, UpdateStadiumCapacityUseCases, UpdateStadiumSquareMetersUseCases } from '../../application';
import { AddedStadiumPublisher } from '../messaging/publisher/match/stadium-added.message-publisher';
import { RegisteredMatchPublisher } from '../messaging/publisher/match/match-registered.message-publisher';
import { UpdatedDatePublisher } from '../messaging/publisher/match/date-updated.message-publisher';
import { RivalService } from '../persistence/services/match/rival.service';
import { UpdatedRivalTownPublisher } from '../messaging/publisher/match/rival-town-updated.message-publisher';
import { StadiumService } from '../persistence/services/match/stadium.service';
import { UpdatedStadiumCapacityPublisher } from '../messaging/publisher/match/stadium-capacity-updated.message-publisher';
import { UpdatedStadiumSquareMetersPublisher } from '../messaging/publisher/match/stadium-square-meters-updated.message-publisher';

@Controller('match')
export class MatchController {
      

    constructor(
        private readonly matchService: MatchService,
        private readonly addedRivalPublisher: AddedRivalPublisher,
        private readonly addedStadiumPublisher: AddedStadiumPublisher,
        private readonly registeredMatchPublisher: RegisteredMatchPublisher,
        private readonly getTeam: GetTeamUseCase<IGetTeamCommand, IGotTeamReponse>,
        private readonly getRival: GetRivalUseCases<IGetRivalCommand, IGotRivalResponse>,
        private readonly getStadium: GetStadiumUseCase<IGetStadiumCommand, IGotStadiumResponse>,
        private readonly updatedDatePublisher: UpdatedDatePublisher,
        private readonly rivalService: RivalService,
        private readonly updatedRivalTownPublisher: UpdatedRivalTownPublisher,
        private readonly stadiumService: StadiumService,
        private readonly updatedStadiumCapacityPublisher: UpdatedStadiumCapacityPublisher,
        private readonly updatedStadiumSquareMetersPublisher: UpdatedStadiumSquareMetersPublisher,
    ) {}
    @Post('add-rival')
    async addRival(@Body() rival: IAddRivalCommand) {
        const useCase = new AddRivalUseCase(
            this.matchService,
            this.addedRivalPublisher
        );

        return await useCase.execute(rival)
    }

    @Post('add-stadium')
    async addStadium(@Body() stadium: IAddStadiumCommand) {
        const useCase = new AddStadiumUseCases(
            this.matchService,
            this.addedStadiumPublisher
        )

        return useCase.execute(stadium)
    }

    @Post('register-match')
    async registerMatch(@Body() match: IRegisterMatchCommand) {
        const useCase = new RegisterMatchUseCases(
            this.getTeam,
            this.getRival,
            this.getStadium,
            this.matchService,
            this.registeredMatchPublisher,

        )

        return useCase.execute(match)
    }

    @Patch('update-date')
    updatedDate(@Body() date: IUpdateDateCommand) {
        const useCase = new UpdateDateUseCases(
            this.matchService,
            this.updatedDatePublisher
        )

        return useCase.execute(date);
    }

    @Patch('update-rival-town')
    updateRivalTown(@Body() town: IUpdateRivalTownCommand) {
        const useCase = new UpdateRivalTownUseCases(
            this.rivalService,
            this.updatedRivalTownPublisher
        )

        return useCase.execute(town);
    }

    @Patch('update-stadium-capacity')
    updateStadiumCapacity(@Body() capacity: IUpdateStadiumCapacity) {
        const useCase = new UpdateStadiumCapacityUseCases(
            this.stadiumService,
            this.updatedStadiumCapacityPublisher
        )

        return useCase.execute(capacity);
    }

    @Patch('update-stadium-square-meters')
    updateStadiumSquareMeters(@Body() squareMeters: IUpdateStadiumSquareMeters) {
        const useCase = new UpdateStadiumSquareMetersUseCases(
            this.stadiumService,
            this.updatedStadiumSquareMetersPublisher
        )

        return useCase.execute(squareMeters);
    }
}