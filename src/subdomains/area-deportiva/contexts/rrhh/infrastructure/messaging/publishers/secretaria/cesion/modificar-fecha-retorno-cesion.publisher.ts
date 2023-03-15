import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CesionEntity } from '../../../../persistence';
import { FechaModificadaEventPublisher } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/events/publishers';



@Injectable()
export class ModificarfechaRetornoCesiontPublisher extends FechaModificadaEventPublisher {
    constructor(@Inject('CONSULTORY_CONTEXT') private readonly proxy: ClientProxy) {
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