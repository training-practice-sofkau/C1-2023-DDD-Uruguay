import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { EventService } from '../../persistence/services/event.service';
import { EventPostgreEntity } from '../../persistence/databases/postgres/entities/event.entity';
@Controller()
export class FirstTeamSuscriberController {

    constructor(private readonly service: EventService) {}

    @EventPattern('first-team.added-rival')
    addedRival(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-rival';
        event.createdAt = Date.now();

        this.service.create(event);
        

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.added-stadium')
    addStadium(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-stadium';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.registered-match')
    registeredMatch(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.registered-match';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.updated-rival-town')
    updatedRivalTown(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-rival-town';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.updated-date')
    updatedDate(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-date';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.updated-stadium-capacity')
    updatedStadiumCapacity(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-stadium-capacity';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('first-team.updated-stadium-square-meters')
    updatedStadiumSquareMeters(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-stadium-square-meters';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-coach-wage')
    updatedCoachWage(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-coach-wage';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.added-player')
    addedPlayer(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-player';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-player-position')
    updatedPlayerPosition(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-player-position';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-player-wage')
    updatedPlayerWage(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-player-wage';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.registered-team')
    registeredTeam(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.registered-team';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-duration')
    updatedDuration(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-duration';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-name')
    updatedName(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-name';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.added-trainer')
    addedTrainer(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-trainer';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.added-training-equipment')
    addedTrainingEquipment(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-training-equipment';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-training-equipment-type')
    updatedTrainingEquipmentType(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-training-equipment-type';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.added-training-field')
    addedTrainingField(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-training-field';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-training-field-name')
    updatedTrainingFieldName(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-training-field-name';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.registered-training')
    registeredTraining(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.registered-training';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-trainer-specialty')
    updatedTrainerSpecialty(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-trainer-specialty';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.added-workout')
    addedWorkout(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.added-workout';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    @EventPattern('first-team.updated-workout-goal')
    updatedWorkoutGoal(@Payload() data: any, @Ctx() context: KafkaContext){

        const event = new EventPostgreEntity()

        event.data = data;
        event.type = 'first-team.updated-workout-goal';
        event.createdAt = Date.now();

        this.service.create(event);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
}