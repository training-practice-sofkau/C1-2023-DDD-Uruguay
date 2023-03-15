import { ValueObjectErrorHandler, IUseCase } from "src/libs";
import { IBuscarEmpleadoCommands } from '../../../domain/interfaces/commands/staff-deportivo/buscar-empleado.commands';
import { EmpleadoDomainEntity } from '../../../domain/entities/empleado/EmpleadoDomainEntity';
import { EmpleadoBuscadoEventPublisher } from '../../../domain/events/publishers/staff-deporitvo/empleado-buscado.event-publisher';
import { IEmpleadoBuscadoResponse } from '../../../domain/interfaces/responses/staff-deportivo/empleado-buscado.response';
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { IEmpleadoDomainService } from '../../../domain/services/staff-Deportivo/empleado.domain-service';

export class BuscarEmpleadoUseCase extends ValueObjectErrorHandler
implements IUseCase<IBuscarEmpleadoCommands, IEmpleadoBuscadoResponse> {

private readonly aggregateRoot: StaffDeportivoAggregate;

constructor(
    private readonly empleadoService: IEmpleadoDomainService,
    private readonly empleadoBuscadoEvent: EmpleadoBuscadoEventPublisher,
) {
    super();
    this.aggregateRoot = new StaffDeportivoAggregate({ empleadoService, empleadoBuscadoEvent });
}

//Ejecutar el comando , usando otra funcion para crear lo que necesita el comando 
async execute(command?: IBuscarEmpleadoCommands): Promise<IEmpleadoBuscadoResponse> {
    const data = await this.exectueStaffDeporivoAggregateRoot(command.empleadoId);

    return { success: data ? true : false, data }
}


//Manda a llamar al al servicio y asi usar sus metodos 
private exectueStaffDeporivoAggregateRoot(emleadoid: string): Promise<EmpleadoDomainEntity | null> {
    return this.aggregateRoot.BuscarEmpleado(emleadoid)
}
}

