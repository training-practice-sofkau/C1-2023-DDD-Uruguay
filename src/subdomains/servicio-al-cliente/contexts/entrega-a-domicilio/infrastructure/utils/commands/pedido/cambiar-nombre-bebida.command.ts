import { IsString, IsUUID } from "class-validator";
import { ICambiarNombreBebidaCommand } from "../../../../domain";

 export class CambiarNombreBebidaCommand implements ICambiarNombreBebidaCommand {

    @IsUUID()
    bebidaId?: string;

    @IsString()
    nuevoNombre?: string;
}