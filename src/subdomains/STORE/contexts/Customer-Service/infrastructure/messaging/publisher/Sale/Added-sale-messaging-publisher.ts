import { AddedSaleEventPublisher } from "../../../../domain/events/publishers/Sale";
import { SaleDomainEntity } from '../../../../domain/entities/Sale-domain/sale-domain-entity';
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";

export class IAddedSaleEventPublisher extends AddedSaleEventPublisher {

    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = SaleDomainEntity>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }

}
