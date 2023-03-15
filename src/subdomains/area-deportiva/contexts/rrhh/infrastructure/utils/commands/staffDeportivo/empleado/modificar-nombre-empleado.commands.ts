import { IsString ,IsUUID} from 'class-validator';
import { IModificarNombreCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/empleado';

export class ModificarNombreEmpleadoCommand implements IModificarNombreCommands {

    @IsUUID()
    empleadoid: string;

    @IsString()
    nombre: string;
}