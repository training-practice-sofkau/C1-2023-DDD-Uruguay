import { IsString,IsUUID } from 'class-validator';
import { IModificarTipoEmpleadoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/empleado';

export class ModificarTipoEmpleadoCommand implements IModificarTipoEmpleadoCommands {
    
    @IsUUID()
    empleadoid: string;

    @IsString()
    tipoEmpelado: string;
}