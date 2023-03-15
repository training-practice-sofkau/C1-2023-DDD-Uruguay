import { IsUUID } from "class-validator";
import { IRegisterOrder } from "../../../../domain/interfaces/commands/Order-commands/register.order-command";

export class IRegisterOrderCommand implements IRegisterOrder {
    @IsUUID()
    clientID: string;

    @IsUUID()
    MangaID: string;

    @IsUUID()
    idOrder: string;
}