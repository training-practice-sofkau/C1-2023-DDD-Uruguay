import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { SaleDomainEntity, SellerDomain } from "../../../../domain/entities";
import { SalesObtainedEventPublisher } from "../../../../domain/events/publishers/Sale";

export class ISalesObtainedEventPublisher  extends SalesObtainedEventPublisher{

    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = SaleDomainEntity>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }
        }
