import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs/sofka';
import { NombreRepartidorCambiadoEventPublisherBase } from '../../../../domain/events/publishers/ticket';
import { RepartidorEntity } from '../../../persistence/entities';


@Injectable()
export class NombreRepartidorCambiadoPublisher extends NombreRepartidorCambiadoEventPublisherBase {
    constructor(@Inject('ENTREGA-A-DOMICILIO_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = RepartidorEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}