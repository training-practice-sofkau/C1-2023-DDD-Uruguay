import { EventPublisherBase } from "src/libs";
import { NegociacionDomainEntity } from "../../../entities";

export abstract class StateNegociacionModificadoEventPublisher<Response = NegociacionDomainEntity>
extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'management_system.registered-order',
        JSON.stringify({ data: this.response })
    )
}
}