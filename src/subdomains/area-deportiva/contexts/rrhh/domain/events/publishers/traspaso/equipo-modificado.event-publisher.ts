import { EventPublisherBase } from "src/libs";
import { TraspasoDomainEntity } from '../../../entities/traspaso/traspaso.domain-entity';

export abstract class EquipoTraspasoModificadoEventPublisher<Response = TraspasoDomainEntity>
extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'rrhh.equipo-modificado',
        JSON.stringify({ data: this.response })
    )
}
}
