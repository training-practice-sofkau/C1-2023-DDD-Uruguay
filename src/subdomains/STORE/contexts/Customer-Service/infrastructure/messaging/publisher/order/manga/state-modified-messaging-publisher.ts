import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { MangaDomainBase } from "src/subdomains/Store/contexts/Customer-Service/domain/entities";
import { StateModifiedEventPublisher } from "src/subdomains/Store/contexts/Customer-Service/domain/events/publishers/order";

export class IStateModifiedEventPublisher extends StateModifiedEventPublisher {

    

    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = MangaDomainBase>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }



}
