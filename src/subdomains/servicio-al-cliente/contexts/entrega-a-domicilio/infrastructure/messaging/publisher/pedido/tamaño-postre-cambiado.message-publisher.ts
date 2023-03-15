import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs/sofka';
import { TamanioPostreCambiadoEventPublisherBase } from '../../../../domain/events/publishers/pedido';
import { PostreEntity } from '../../../persistence/entities';


@Injectable()
export class TamanioPostreCambiadoPublisher extends TamanioPostreCambiadoEventPublisherBase {
    constructor(@Inject('ENTREGA-A-DOMICILIO_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = PostreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}