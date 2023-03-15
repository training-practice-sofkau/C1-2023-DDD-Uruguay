import { EventPublisherBase } from "src/libs";
import { ContratoDomainEntity } from '../../../entities/contrato/contrato.domain-entity';

export abstract class StateContratoModificadoEventPublisher
<Response = ContratoDomainEntity>
    extends EventPublisherBase<Response>{
        
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.state-contrato-modificado.',
            JSON.stringify({ data: this.response })
        )
    }
}