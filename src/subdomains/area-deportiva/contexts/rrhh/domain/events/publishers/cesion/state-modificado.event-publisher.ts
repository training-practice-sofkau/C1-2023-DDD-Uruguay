import { EventPublisherBase } from "src/libs";
import { CesionDomainEntity } from '../../../entities/cesion/cesion.domain-entity';

export abstract class StateModificadoEventPublisher
<Response = CesionDomainEntity>
    extends EventPublisherBase<Response>{
        
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.state-cesion-modificado.',
            JSON.stringify({ data: this.response })
        )
    }
}