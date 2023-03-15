import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { BillDomain } from "../../../../domain/entities";
import { BillObtainedEventPublisher } from "../../../../domain/events/publishers/Sale/Bill";

export class IBillObtainedEventPublisher extends  BillObtainedEventPublisher{
    
    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = BillDomain>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }
}
