import { IsUUID } from "class-validator";
import { IObtenerBebidaCommand } from "../../../../domain";

export class ObtenerBebidaCommand implements IObtenerBebidaCommand{

    @IsUUID()
    bebidaId?: string;
}