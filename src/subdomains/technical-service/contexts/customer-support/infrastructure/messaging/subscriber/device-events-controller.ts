import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventRepository } from "../../persistence";
import { EventEntity } from "../../persistence/entities/event.entity";

@Controller()
export class DeviceEventsController{

    constructor(
        private readonly eventRepository: EventRepository
    ){ }

    @EventPattern('customer-support.device-added')
    deviceAdded(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.device-added', data);

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