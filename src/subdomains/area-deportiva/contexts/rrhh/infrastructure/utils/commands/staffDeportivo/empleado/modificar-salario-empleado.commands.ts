import { IsString,IsUUID } from 'class-validator';
import { IModificarSalarioEmpleadoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/staff-deportivo';

export class ModificarSalarioEmpleadoCommand implements IModificarSalarioEmpleadoCommands {

    @IsUUID()
    empleadoId?: string;

    @IsString()
    salario?: number;
}