import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { MangaDomainBase } from "src/subdomains/Store/contexts/Customer-Service/domain/entities";
import { NameModifiedEventPublisher } from "src/subdomains/Store/contexts/Customer-Service/domain/events/publishers/order";
import { ClientDomainBase } from '../../../../../domain/entities/Order-domain/client-domain-entity';

export class INameModifiedEventPublisher extends NameModifiedEventPublisher  {


    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = ClientDomainBase>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }

}
