import { IsUUID } from "class-validator";
import { IUpdateNameSeller } from "../../../../domain/interfaces/commands";

export class IUpdateNameSellerName implements IUpdateNameSeller {
    @IsUUID()
    idseller: string;
    name: string;
}
