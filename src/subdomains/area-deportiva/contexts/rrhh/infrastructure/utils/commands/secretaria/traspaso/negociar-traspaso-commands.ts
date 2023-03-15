import { IsBoolean, IsString ,IsNumber, IsUUID} from 'class-validator';
import { INegociarTraspasoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/secretaria';


export class NegociarTraspasoCommand implements INegociarTraspasoCommands {

     @IsUUID()
    traspasoId?: string;

     @IsUUID()
    empleadoId: string;

     @IsUUID()
    equipoNuevoId?: string;

     @IsUUID()
    equipoSalidaId?: string;

    @IsString()
    fechaSalida?: string;

    @IsNumber()
    costo?: number;

    @IsBoolean()
    state?: boolean;
}