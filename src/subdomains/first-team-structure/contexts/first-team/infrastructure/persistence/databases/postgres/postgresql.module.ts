import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TypeOrmPostgresConfigService } from './configs/type-orm-postgres-config.service';
import { CoachPostgreEntity, MatchPostgreEntity, PlayerPostgreEntity, RivalPostgreEntity, StadiumPostgreEntity, TeamPostgreEntity, TrainerPostgreEntity, TrainingEquipmentPostgreEntity, TrainingFieldPostgreEntity, TrainingPostgreEntity, WorkoutPostgreEntity } from './entities';
import { EventPostgreEntity } from './entities/event.entity';
import { CoachRepository, MatchRepository, PlayerRepository, RivalRepository, StadiumRepository, TeamRepository, TrainerRepository, TrainingEquipmentRepository, TrainingFieldRepository, TrainingRepository, WorkoutRepository } from './repositories';
import { EventRepository } from './repositories/event.repository';
import { CoachPostgreService, MatchPostgreService, PlayerPostgreService, RivalPostgreService, StadiumPostgreService, TeamPostgreService, TrainerPostgreService, TrainingEquipmentPostgreService, TrainingFieldPostgreService, TrainingPostgreService, WorkoutPostgreService } from './services';
import { EventPostgreService } from './services/event.service';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useClass: TypeOrmPostgresConfigService
  }),
  TypeOrmModule.forFeature(
    [RivalPostgreEntity, StadiumPostgreEntity, MatchPostgreEntity, TeamPostgreEntity, PlayerPostgreEntity, CoachPostgreEntity,
    TrainingPostgreEntity, TrainingFieldPostgreEntity, TrainingEquipmentPostgreEntity, TrainerPostgreEntity,
    WorkoutPostgreEntity, EventPostgreEntity]
  )
],
  controllers: [],
  providers: [TypeOrmPostgresConfigService, RivalPostgreService, StadiumPostgreService, MatchPostgreService, TeamPostgreService,
  PlayerPostgreService, CoachPostgreService, TrainingPostgreService, TrainingFieldPostgreService, TrainingEquipmentPostgreService,
TrainerPostgreService, WorkoutPostgreService, EventPostgreService, RivalRepository, StadiumRepository, MatchRepository, TeamRepository, PlayerRepository, CoachRepository,
TrainingRepository, TrainingFieldRepository, TrainingEquipmentRepository, TrainerRepository, WorkoutRepository, EventRepository],
exports: [TypeOrmPostgresConfigService, RivalPostgreService, StadiumPostgreService, MatchPostgreService, TeamPostgreService,
  PlayerPostgreService, CoachPostgreService, TrainingPostgreService, TrainingFieldPostgreService, TrainingEquipmentPostgreService,
TrainerPostgreService, WorkoutPostgreService, EventPostgreService, RivalRepository, StadiumRepository, MatchRepository, TeamRepository, PlayerRepository, CoachRepository,
TrainingRepository, TrainingFieldRepository, TrainingEquipmentRepository, TrainerRepository, WorkoutRepository, EventRepository]
})
export class PostgreSQLModule {}
