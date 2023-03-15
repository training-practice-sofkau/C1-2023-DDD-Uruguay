import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IEventPublisher } from '@sofka';
import { RepairsAddedEventPublisherBase } from '../../../domain/events/publishers/support-ticket/repairs/repairs-added.event-publisher';
import { RepairEntity } from '../../persistence/entities/repairs.entity';


export class RepairsAddedPublisher extends RepairsAddedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = RepairEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }