import { IsString,IsUUID } from 'class-validator';
import { IModificarDocumentoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/empleado';

export class ModificarDocumentoEmpleadoCommand implements IModificarDocumentoCommands {

    @IsUUID()
    empleadoid: string;

    @IsString()
    documento: string;
}