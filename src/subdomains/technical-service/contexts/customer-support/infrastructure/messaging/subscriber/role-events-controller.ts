import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventRepository } from "../../persistence/";
import { EventEntity } from "../../persistence/entities/event.entity";


@Controller()
export class RoleEventsController{
 
    constructor(
        private readonly eventRepository: EventRepository
    ){ }
 

    @EventPattern('customer-support.role-created')
    roleCreated(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.role-created', data); 

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }   

    @EventPattern('customer-support.role-description-changed')
    roleDescriptionChanged(@Payload() data: any, @Ctx() context: KafkaContext){


       this.registerEvent('customer-support.role-description-changed', data); 

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }   



    /**
     * registers the event in DB
     *
     * @private
     * @param {string} sender
     * @param {*} data
     * @memberof RoleEventsController
     */
     private registerEvent(sender: string, data: any) {
        const event = new EventEntity();

        event.data = data;
        event.type = sender;
        event.createdAt = Date.now();

        this.eventRepository.create(event);
    }
}

