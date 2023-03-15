import { OrderAddEventPublisher } from "../../../../domain/events/publishers/order";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { OrderDomainEntityBase } from "../../../../domain/entities";
import { IEventPublisher } from "src/libs/sofka/interface/event-publisher.interface";

export class IOrderAddEventPublisher extends OrderAddEventPublisher {
    
constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
    super(proxy as unknown as IEventPublisher);
}

    emit<Result = any, Input = OrderDomainEntityBase>(
        pattern: any, data: Input):
        Promise<Result>{
        return lastValueFrom<Result>(this.proxy.emit(pattern, data))
        }
    }

