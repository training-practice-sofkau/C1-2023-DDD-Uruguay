import { IsBoolean, IsUUID } from "class-validator";
import { ICambiarPostreEsParaVeganosCommand } from "../../../../domain/interfaces/commands/pedido/cambiar-postre-es-para-veganos.command";

 export class CambiarPostreEsParaVeganosCommand implements ICambiarPostreEsParaVeganosCommand {

    @IsUUID()
    postreId?: string;

    @IsBoolean()
    nuevoEstado?: boolean;
}