import { EventPublisherBase } from "src/libs";
import { EmpleadoDomainEntity } from "../../../entities/empleado/EmpleadoDomainEntity";

export abstract class NombreModificadoEventPublisher <Response = EmpleadoDomainEntity>
extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'rrhh.nombre-empleado-modificado.',
        JSON.stringify({ data: this.response })
    )
}
}