import { EventPublisherBase } from "src/libs";
import { TraspasoDomainEntity } from '../../../entities/traspaso/traspaso.domain-entity';

export abstract class StateTraspasoModificadoEventPublisher
 <Response = TraspasoDomainEntity>
    extends EventPublisherBase<Response>{
        
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.state-traspaso-modificado.',
            JSON.stringify({ data: this.response })
        )
    }
}
