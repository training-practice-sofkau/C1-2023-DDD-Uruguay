import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventRepository } from "../../persistence";
import { EventEntity } from "../../persistence/entities/event.entity";

@Controller()
export class InvoiceEventsController{

    constructor(
        private readonly eventRepository: EventRepository
    ){ }
 
    @EventPattern('customer-support.invoice-created')
    invoiceCreated(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.invoice-created', data);

        
        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }

    @EventPattern('customer-support.warranty-added')
    warrantyAdded(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.warranty-added', data);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }

    @EventPattern('customer-support.invoice-marked-as-paid')
    invoiceMarkedAsPaid(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.invoice-marked-as-paid', data);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

    }
    
    @EventPattern('customer-support.customer-created')
    customerCreated(@Payload() data: any, @Ctx() context: KafkaContext){

        this.registerEvent('customer-support.customer-created', data);

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