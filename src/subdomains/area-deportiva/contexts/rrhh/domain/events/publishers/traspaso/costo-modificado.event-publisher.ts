import { EventPublisherBase } from "src/libs";
import { TraspasoDomainEntity } from '../../../entities/traspaso/traspaso.domain-entity';

export abstract class CostoTraspasoModificadoEventPublisher
    <Response = TraspasoDomainEntity>
    extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'management_system.registered-order',
        JSON.stringify({ data: this.response })
    )
}
}
