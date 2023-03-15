import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventRepository } from "../../persistence";
import { EventEntity } from "../../persistence/entities/event.entity";

@Controller()
export class WarrantyEventsController {

    constructor(
        private readonly eventRepository: EventRepository
    ) { }

    @EventPattern('customer-support.warranty-end-date-changed')
    warrantyEndDateChanged(@Payload() data: any, @Ctx() context: KafkaContext) {

        this.registerEvent('customer-support.warranty-end-date-changed', data);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }

    @EventPattern('customer-support.warranty-status-changed')
    warrantyStatusChanged(@Payload() data: any, @Ctx() context: KafkaContext) {

        this.registerEvent('customer-support.warranty-status-changed', data);

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