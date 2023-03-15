import { ClientProxy } from '@nestjs/microservices';
import { CostoModificadoEventPublisher } from '../../../../../domain/events/publishers/cesion/costo-modificado.event-publisher';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CesionEntity } from '../../../../persistence';



@Injectable()
export class ModificarCostoCesiontPublisher extends CostoModificadoEventPublisher {
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