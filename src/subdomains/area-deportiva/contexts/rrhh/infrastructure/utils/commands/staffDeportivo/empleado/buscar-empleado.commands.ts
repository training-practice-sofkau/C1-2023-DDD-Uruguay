import {  IsUUID } from 'class-validator';
import { IBuscarEmpleadoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/staff-deportivo';

export class BuscarEmpleadoCommand implements IBuscarEmpleadoCommands {
    
    @IsUUID()
    empleadoId: string;

}