import { EventPublisherBase } from "src/libs";
import { EmpleadoDomainEntity } from "../../../entities/empleado/EmpleadoDomainEntity";

export abstract class TipoEmpleadoModificadoEventPublisher
<Response = EmpleadoDomainEntity>
    extends EventPublisherBase<Response>{
        
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'rrhh.tipo-empleado-modificado.',
            JSON.stringify({ data: this.response })
        )
    }
}