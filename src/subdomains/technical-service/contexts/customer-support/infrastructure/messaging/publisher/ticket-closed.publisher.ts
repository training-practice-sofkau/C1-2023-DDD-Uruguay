import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IEventPublisher } from '@sofka';
import { NewTicketAddedEventPublisherBase } from '../../../domain/events/publishers';
import { SupportTicketEntity } from '../../persistence/entities/support-ticket.entity';
import { SupportTicketClosedEventPublisherBase } from '../../../domain/events/publishers/support-ticket/ticket-closed.event-publisher';


export class SupportTicketClosedPublisher extends SupportTicketClosedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = SupportTicketEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }