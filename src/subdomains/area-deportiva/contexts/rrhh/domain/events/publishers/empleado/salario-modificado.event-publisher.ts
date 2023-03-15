import { EventPublisherBase } from "src/libs";
import { EmpleadoDomainEntity } from "../../../entities/empleado/EmpleadoDomainEntity";

export abstract class SalarioModificadoEventPublisher<Response = EmpleadoDomainEntity>
extends EventPublisherBase<Response>{
    
publish<Result = any>(): Promise<Result> {
    return this.emit(
        'rrhh.salario-empleado-modificado.',
        JSON.stringify({ data: this.response })
    )
}
}