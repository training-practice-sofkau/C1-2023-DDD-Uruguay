import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs';
import { MangaObtainedEventPublisher } from 'src/subdomains/Store/contexts/Customer-Service/domain/events/publishers/order';
import { BillDomain } from '../../../../../domain/entities/Sale-domain/bill-domain-entity';
export class IMangaObtainedEventPublisher  extends MangaObtainedEventPublisher {
    constructor(@Inject('MANGA_STORE_CONTEXT') private readonly proxy: ClientProxy){
        super(proxy as unknown as IEventPublisher);
    }
    
        emit<Result = any, Input = BillDomain>(
            pattern: any, data: Input):
            Promise<Result>{
            return lastValueFrom<Result>(this.proxy.emit(pattern, data))
            }
}
