import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AddedRivalPublisher } from './publisher/match/rival-added.message-publisher';
import { Transport } from '@nestjs/microservices/enums';
import { FirstTeamSuscriberController } from './subscriber/first-team.suscriber';
import { AddedStadiumPublisher } from './publisher/match/stadium-added.message-publisher';
import { RegisteredMatchPublisher } from './publisher/match/match-registered.message-publisher';
import { UpdatedRivalTownPublisher } from './publisher/match/rival-town-updated.message-publisher';
import { UpdatedDatePublisher } from './publisher/match/date-updated.message-publisher';
import { UpdatedStadiumCapacityPublisher } from './publisher/match/stadium-capacity-updated.message-publisher';
import { UpdatedStadiumSquareMetersPublisher } from './publisher/match/stadium-square-meters-updated.message-publisher';
import { AddedCoachPublisher } from './publisher/team/coach-added.message-publisher';
import { UpdatedCoachWagePublisher } from './publisher/team/coach-wage-updated.message-publisher';
import { AddedPlayerPublisher } from './publisher/team/player-added.message-publisher';
import { UpdatedPlayerPositionPublisher } from './publisher/team/player-position-updated.message-publisher';
import { UpdatedPlayerWagePublisher } from './publisher/team/player-wage-updated.message-publisher';
import { RegisteredTeamPublisher } from './publisher/team/team-registered.message-publisher';
import { UpdatedDurationPublisher } from './publisher/training/duration-updated.message-publisher';
import { UpdatedNamePublisher } from './publisher/training/name-updated.message-publisher';
import { AddedTrainerPublisher } from './publisher/training/trainer-added.message-publisher';
import { AddedTrainingEquipmentPublisher } from './publisher/training/training-equipment-added.message-publisher';
import { UpdatedTrainingEquipmentTypePublisher } from './publisher/training/training-equipment-type-updated.message-publisher';
import { AddedTrainingFieldPublisher } from './publisher/training/training-field-added.message-publisher';
import { UpdatedTrainingFieldNamePublisher } from './publisher/training/training-field-name-updated.message-publisher';
import { RegisteredTrainingPublisher } from './publisher/training/training-registered.message-publisher';
import { UpdatedTrainerSpecialtyPublisher } from './publisher/training/training-specialty-updated.message-publisher';
import { AddedWorkoutPublisher } from './publisher/training/workout-added.message-publisher';
import { UpdatedWorkoutGoalPublisher } from './publisher/training/workout-goal-updated.message-publisher';

@Module({
    imports: [ClientsModule.register([
        {
            name: 'FIRST_TEAM',
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                },
            },

        },
    ]),],
    controllers: [FirstTeamSuscriberController],
    providers: [AddedRivalPublisher, AddedStadiumPublisher, RegisteredMatchPublisher, UpdatedRivalTownPublisher, UpdatedDatePublisher,
    UpdatedStadiumCapacityPublisher, UpdatedStadiumSquareMetersPublisher, AddedCoachPublisher, UpdatedCoachWagePublisher, AddedPlayerPublisher,
UpdatedPlayerPositionPublisher, UpdatedPlayerWagePublisher, RegisteredTeamPublisher, UpdatedDurationPublisher, UpdatedNamePublisher, AddedTrainerPublisher,
AddedTrainingEquipmentPublisher, UpdatedTrainingEquipmentTypePublisher, AddedTrainingFieldPublisher, UpdatedTrainingFieldNamePublisher,
RegisteredTrainingPublisher, UpdatedTrainerSpecialtyPublisher, AddedWorkoutPublisher, UpdatedWorkoutGoalPublisher],
  exports: [AddedRivalPublisher, AddedStadiumPublisher, RegisteredMatchPublisher, UpdatedRivalTownPublisher, UpdatedDatePublisher,
    UpdatedStadiumCapacityPublisher, UpdatedStadiumSquareMetersPublisher, AddedCoachPublisher, UpdatedCoachWagePublisher, AddedPlayerPublisher,
UpdatedPlayerPositionPublisher, UpdatedPlayerWagePublisher, RegisteredTeamPublisher, UpdatedDurationPublisher, UpdatedNamePublisher, AddedTrainerPublisher,
AddedTrainingEquipmentPublisher, UpdatedTrainingEquipmentTypePublisher, AddedTrainingFieldPublisher, UpdatedTrainingFieldNamePublisher,
RegisteredTrainingPublisher, UpdatedTrainerSpecialtyPublisher, AddedWorkoutPublisher, UpdatedWorkoutGoalPublisher]
  })
  export class MessagingModule {}