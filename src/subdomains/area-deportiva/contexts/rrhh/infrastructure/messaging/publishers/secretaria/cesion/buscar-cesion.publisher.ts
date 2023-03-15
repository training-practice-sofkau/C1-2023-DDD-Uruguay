import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';import { CesionBuscadaEventPublisher } from '../../../../../domain/events/publishers/secretaria/cesion-buscada.event-publisher';
import { CesionEntity } from '../../../../persistence/entities/cesion.entity';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BuscarCesiontPublisher extends CesionBuscadaEventPublisher {
    constructor(@Inject('RRHH_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = CesionEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}