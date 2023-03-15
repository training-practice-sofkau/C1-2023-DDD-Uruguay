import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs/sofka';
import { TicketCreadoEventPublisherBase } from '../../../../domain/events/publishers/ticket';
import { TicketEntity } from '../../../persistence/entities';


@Injectable()
export class TicketCreadoPublisher extends TicketCreadoEventPublisherBase {
    constructor(@Inject('ENTREGA-A-DOMICILIO_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = TicketEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}