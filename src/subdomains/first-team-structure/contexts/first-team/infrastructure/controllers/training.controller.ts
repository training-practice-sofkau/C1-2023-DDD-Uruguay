import { Controller, Post, Body, Patch } from '@nestjs/common/decorators';
import { AddTrainerUseCases, AddTrainingEquipmentUseCases, AddTrainingFieldUseCases, AddWorkoutUseCases, GetTeamUseCase, GetTrainerUseCase, GetTrainingFieldUseCase, GetTrainingUseCase, RegisterTrainingUseCases, UpdateDurationUseCases, UpdateNameUseCases, UpdateTrainerSpecialtyUseCases, UpdateTrainingEquipmentTypeUseCases, UpdateTrainingFieldNameUseCases, UpdateWorkoutGoalUseCases } from '../../application';
import { IAddTrainerCommand, IAddTrainingEquipmentCommand, IAddTrainingFieldCommand, IAddWorkoutCommand, IGetTeamCommand, IGetTrainerCommand, IGetTrainingCommand, IGetTrainingFieldCommand, IGotTeamReponse, IGotTrainerResponse, IGotTrainingFieldResponse, IGotTrainingResponse, IRegisterTrainingCommand, IUpdateDateCommand, IUpdateDurationCommand, IUpdateNameCommand, IUpdateTrainerSpecialtyCommand, IUpdateTrainingEquipmentTypeCommand, IUpdateTrainingFieldNameCommand, IUpdateWorkoutGoalCommand } from '../../domain';
import { UpdatedDurationPublisher } from "../messaging/publisher/training/duration-updated.message-publisher";
import { UpdatedNamePublisher } from "../messaging/publisher/training/name-updated.message-publisher";
import { AddedTrainerPublisher } from "../messaging/publisher/training/trainer-added.message-publisher";
import { AddedTrainingEquipmentPublisher } from "../messaging/publisher/training/training-equipment-added.message-publisher";
import { UpdatedTrainingEquipmentTypePublisher } from "../messaging/publisher/training/training-equipment-type-updated.message-publisher";
import { AddedTrainingFieldPublisher } from "../messaging/publisher/training/training-field-added.message-publisher";
import { UpdatedTrainingFieldNamePublisher } from "../messaging/publisher/training/training-field-name-updated.message-publisher";
import { RegisteredTrainingPublisher } from "../messaging/publisher/training/training-registered.message-publisher";
import { UpdatedTrainerSpecialtyPublisher } from "../messaging/publisher/training/training-specialty-updated.message-publisher";
import { AddedWorkoutPublisher } from "../messaging/publisher/training/workout-added.message-publisher";
import { UpdatedWorkoutGoalPublisher } from "../messaging/publisher/training/workout-goal-updated.message-publisher";
import { TrainerService } from "../persistence/services/training/trainer.service";
import { TrainingEquipmentService } from "../persistence/services/training/training-equipment.service";
import { TrainingFieldService } from "../persistence/services/training/training-field.service";
import { TrainingService } from "../persistence/services/training/training.service";
import { WorkoutService } from "../persistence/services/training/workout.service";

@Controller('training')
export class TrainingController {
    constructor(
        private readonly trainingService: TrainingService,
        private readonly trainingEquipmentService: TrainingEquipmentService,
        private readonly trainingFieldService: TrainingFieldService,
        private readonly trainerService: TrainerService,
        private readonly workoutService: WorkoutService,
        private readonly registeredTrainingPublisher: RegisteredTrainingPublisher,
        private readonly addedTrainingEquipmentPublisher: AddedTrainingEquipmentPublisher,
        private readonly addedTrainingFieldPublisher: AddedTrainingFieldPublisher,
        private readonly addedTrainerPublisher: AddedTrainerPublisher,
        private readonly addedWorkoutPublisher: AddedWorkoutPublisher,
        private readonly updatedDurationPublisher: UpdatedDurationPublisher,
        private readonly updatedTrainingEquipmentTypePublisher: UpdatedTrainingEquipmentTypePublisher,
        private readonly updatedNamePublisher: UpdatedNamePublisher,
        private readonly updatedTrainingFieldNamePublisher: UpdatedTrainingFieldNamePublisher,
        private readonly updatedTrainerSpecialtyPublisher: UpdatedTrainerSpecialtyPublisher,
        private readonly updatedWorkoutGoalPublisher: UpdatedWorkoutGoalPublisher,
        private readonly getTeam: GetTeamUseCase<IGetTeamCommand, IGotTeamReponse>,
        private readonly getTrainingField: GetTrainingFieldUseCase<IGetTrainingFieldCommand, IGotTrainingFieldResponse>,
        private readonly getTrainer: GetTrainerUseCase<IGetTrainerCommand, IGotTrainerResponse>,
        private readonly getTrainingUseCase: GetTrainingUseCase<IGetTrainingCommand, IGotTrainingResponse>,
    ) {}

    @Post('register-training')
    async registerTraining(@Body() training: IRegisterTrainingCommand) {
        const useCase = new RegisterTrainingUseCases(
            this.getTeam,
            this.getTrainingField,
            this.getTrainer,
            this.trainingService,
            this.registeredTrainingPublisher
        );

        return await useCase.execute(training)
    }

    @Post('add-trainer')
    async addTrainer(@Body() trainer: IAddTrainerCommand) {
        const useCase = new AddTrainerUseCases(
            this.trainingService,
            this.addedTrainerPublisher
        );

        return await useCase.execute(trainer)
    }

    @Post('add-training-field')
    async addTrainingField(@Body() trainingField: IAddTrainingFieldCommand) {
        const useCase = new AddTrainingFieldUseCases(
            this.trainingService,
            this.addedTrainingFieldPublisher
        );

        return await useCase.execute(trainingField)
    }

    @Post('add-training-equipment')
    async addTrainingEquipment(@Body() trainingEquipment: IAddTrainingEquipmentCommand) {
        const useCase = new AddTrainingEquipmentUseCases(
            this.trainingService,
            this.addedTrainingEquipmentPublisher,
            this.getTrainingUseCase
        );

        return await useCase.execute(trainingEquipment)
    }

    @Post('add-workout')
    async addWorkout(@Body() workout: IAddWorkoutCommand) {
        const useCase = new AddWorkoutUseCases(
            this.trainingService,
            this.addedWorkoutPublisher,
            this.getTrainingUseCase
        );

        return await useCase.execute(workout)
    }

    @Patch('update-name')
    updateName(@Body() name: IUpdateNameCommand) {
        const useCase = new UpdateNameUseCases(
            this.trainingService,
            this.updatedNamePublisher
        )

        return useCase.execute(name);
    }

    @Patch('update-duration')
    updateDuration(@Body() duration: IUpdateDurationCommand) {
        const useCase = new UpdateDurationUseCases(
            this.trainingService,
            this.updatedDurationPublisher
        )

        return useCase.execute(duration);
    }

    @Patch('update-trainer-specialty')
    updateTrainerSpecialty(@Body() specialty: IUpdateTrainerSpecialtyCommand) {
        const useCase = new UpdateTrainerSpecialtyUseCases(
            this.trainerService,
            this.updatedTrainerSpecialtyPublisher
        )

        return useCase.execute(specialty);
    }

    @Patch('update-training-equipment-type')
    updateTrainingEquipmentType(@Body() type: IUpdateTrainingEquipmentTypeCommand) {
        const useCase = new UpdateTrainingEquipmentTypeUseCases(
            this.trainingEquipmentService,
            this.updatedTrainingEquipmentTypePublisher
        )

        return useCase.execute(type);
    }

    @Patch('update-training-field-name')
    updateTrainingFieldName(@Body() name: IUpdateTrainingFieldNameCommand) {
        const useCase = new UpdateTrainingFieldNameUseCases(
            this.trainingFieldService,
            this.updatedTrainingFieldNamePublisher
        )

        return useCase.execute(name);
    }

    @Patch('update-workout-goal')
    updateWorkoutGoal(@Body() goal: IUpdateWorkoutGoalCommand) {
        const useCase = new UpdateWorkoutGoalUseCases(
            this.workoutService,
            this.updatedWorkoutGoalPublisher
        )

        return useCase.execute(goal);
    }
}