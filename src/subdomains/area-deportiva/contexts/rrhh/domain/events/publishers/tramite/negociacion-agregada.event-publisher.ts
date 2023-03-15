import { EventPublisherBase } from "src/libs";
import { TramiteDomainEntity } from "../../../entities/tramite/tramite.entity.interface";

export abstract class NegociacionAgregadaEventPublisher 
<Response = TramiteDomainEntity>
    extends EventPublisherBase<Response>{
        
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.negociacion-creada.',
            JSON.stringify({ data: this.response })
        )
    }
}