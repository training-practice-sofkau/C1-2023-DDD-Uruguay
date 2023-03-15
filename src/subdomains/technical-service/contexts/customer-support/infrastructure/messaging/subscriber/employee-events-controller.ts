import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventRepository } from "../../persistence";
import { EventEntity } from "../../persistence/entities/event.entity";

@Controller()
export class EmployeeEventsController{

    constructor(
        private readonly eventRepository: EventRepository
    ){ }

    @EventPattern('customer-support.employee-created')
    employeeCreated(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.employee-created', data);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }

    @EventPattern('customer-support.employee-email-changed')
    employeeEmailChanged(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.employee-email-changed', data);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }
 
    @EventPattern('customer-support.employee-status-changed')
    employeeStatusChanged(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.employee-status-changed', data);

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
       private async registerEvent(sender: string, data: any) {
        const event = new EventEntity();

        event.data = data;
        event.type = sender;
        event.createdAt = Date.now();

        await this.eventRepository.create(event);
    }
}