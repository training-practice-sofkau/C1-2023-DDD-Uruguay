import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { EmpleadoEntity } from '../../../../persistence/entities/empleado.entity';
import { TipoEmpleadoModificadoEventPublisher } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/events/publishers';



@Injectable()
export class  ModificarTipoEmpleadoPublisher extends TipoEmpleadoModificadoEventPublisher {
    constructor(@Inject('RRHH_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = EmpleadoEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}