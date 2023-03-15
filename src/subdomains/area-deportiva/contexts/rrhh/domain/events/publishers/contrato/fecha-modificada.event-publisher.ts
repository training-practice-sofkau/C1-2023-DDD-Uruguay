import { EventPublisherBase } from "src/libs";
import { ContratoDomainEntity } from "../../../entities/contrato/contrato.domain-entity";

export abstract class FechaContratoModificadaEventPublisher<Response = ContratoDomainEntity>
extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'management_system.registered-order',
        JSON.stringify({ data: this.response })
    )
}
}