import { IsString, IsUUID } from "class-validator";
import { ICambiarVehiculoRepartidorCommand } from "../../../../domain/interfaces/commands/ticket/cambiar-vehiculo-repartidor.command";

 export class CambiarVehiculoRepartidorCommand implements ICambiarVehiculoRepartidorCommand {

    @IsUUID()
    repartidorId?: string;

    @IsString()
    nuevoVehiculo?: string;
}