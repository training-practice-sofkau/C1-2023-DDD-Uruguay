import { EventPublisherBase } from 'src/libs';
import { CesionDomainEntity } from '../../../entities/cesion/cesion.domain-entity';
export abstract class EquipoSalidaCesionModificadoEventPublisher<Response = CesionDomainEntity>
extends EventPublisherBase<Response>{
    
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.equipo-salida-modificado',
            JSON.stringify({ data: this.response })
        )
    }
}