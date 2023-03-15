import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { StaffDeportivoCreadoEventPublisher } from '../../../../domain/events/publishers/staff-deporitvo/staff-depotivo-creado.event-publisher';
import { StaffDeportivoEntity } from '../../../persistence/entities/staff-deportivo.entity';



@Injectable()
export class  CrearStaffDeportivoPublisher extends StaffDeportivoCreadoEventPublisher {
    constructor(@Inject('RRHH_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = StaffDeportivoEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}