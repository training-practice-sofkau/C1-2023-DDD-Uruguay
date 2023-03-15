import { EventPublisherBase } from '../../../../../../../../libs/sofka/bases/event-publisher.base';
import { EmpleadoDomainEntity } from '../../../entities/empleado/EmpleadoDomainEntity';

export abstract class DocumentoModificadoEventPublisher<Response = EmpleadoDomainEntity>
extends EventPublisherBase<Response>{
    
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.documento-empleado-modificado.',
            JSON.stringify({ data: this.response })
        )
    }
}
