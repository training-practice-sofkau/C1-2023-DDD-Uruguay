import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IEventPublisher } from '@sofka';
import { WarrantyStatusChangedEventPublisherBase } from '../../../domain/events/publishers/';
import { WarrantyEntity } from '../../persistence/entities/warranty.entity';


export class WarrantyStatusChangedPublisher extends WarrantyStatusChangedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = WarrantyEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }