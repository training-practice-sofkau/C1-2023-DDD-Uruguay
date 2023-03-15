import { PersistenceModule } from "./persistence/persistence.module";
import { Module } from '@nestjs/common';
import { MatchController } from "./controllers/match.controller";
import { MessagingModule } from "./messaging/messaging.module";
import { GetCoachUseCase, GetRivalUseCases, GetStadiumUseCase, GetTeamUseCase, GetTrainerUseCase, GetTrainingFieldUseCase, GetTrainingUseCase } from "../application";

@Module({
    imports: [PersistenceModule, MessagingModule],
    controllers: [MatchController],
    providers: [GetTeamUseCase, GetRivalUseCases, GetStadiumUseCase, GetTeamUseCase, GetCoachUseCase,
      GetTrainingFieldUseCase, GetTrainerUseCase, GetTrainingUseCase],
  exports: []
  })
  export class FirstTeamModule {}