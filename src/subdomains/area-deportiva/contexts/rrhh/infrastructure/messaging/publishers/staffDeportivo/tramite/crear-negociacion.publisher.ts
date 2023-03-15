import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { NegociacionAgregadaEventPublisher } from '../../../../../domain/events/publishers/tramite/negociacion-agregada.event-publisher';
import { NegociacionEntity } from '../../../../persistence/entities/negociacionentity';



@Injectable()
export class  CrearNegociacionPublisher extends NegociacionAgregadaEventPublisher {
    constructor(@Inject('RRHH_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = NegociacionEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}