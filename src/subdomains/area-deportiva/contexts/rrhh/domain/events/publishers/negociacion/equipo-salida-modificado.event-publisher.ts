import { EventPublisherBase } from 'src/libs';
import { NegociacionDomainEntity } from '../../../entities/negociacion/negociacion.domain-entity';
export abstract class EquipoSalidaNegociacionModificadoEventPublisher<Response = NegociacionDomainEntity>
extends EventPublisherBase<Response>{
    
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.equipo-salida-modificado',
            JSON.stringify({ data: this.response })
        )
    }
}