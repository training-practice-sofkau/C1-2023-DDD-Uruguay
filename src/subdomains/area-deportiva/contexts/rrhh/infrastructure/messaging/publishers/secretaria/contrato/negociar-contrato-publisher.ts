import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs/sofka/interface/event-publisher.interface';
import { Injectable, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ContratoEntity } from '../../../../persistence/entities/contrato.entity';
import { StateContratoModificadoEventPublisher } from '../../../../../domain/events/publishers/contrato/state-modificado.event-publisher';
import { ContratoNegociadoEventPublisher } from '../../../../../domain/events/publishers/secretaria/contrato-negociado.event-publisher';



@Injectable()
export class  NegociarContratoPublisher extends ContratoNegociadoEventPublisher {
    constructor(@Inject('RRHH_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = ContratoEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}