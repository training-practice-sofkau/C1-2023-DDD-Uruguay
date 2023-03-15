import { IsString, IsUUID } from "class-validator";
import { ICambiarNombrePostreCommand } from "../../../../domain";

 export class CambiarNombrePostreCommand implements ICambiarNombrePostreCommand{

    @IsUUID()
    postreId?: string;

    @IsString()
    nuevoNombre?: string;
}