import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CesionEntity } from '../../../../persistence';
import { EquipoSalidaNegociacionModificadoEventPublisher } from '../../../../../domain/events/publishers/negociacion/equipo-salida-modificado.event-publisher';
import { EquipoSalidaCesionModificadoEventPublisher } from '../../../../../domain/events/publishers/cesion/equipo-salida-modificado.event-publisher';



@Injectable()
export class ModificarEquipoCesiontPublisher extends EquipoSalidaCesionModificadoEventPublisher {
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