import { IsUUID } from "class-validator";
import { IGetSellerData } from "../../../../domain/interfaces/commands";

export class IGetSeller implements IGetSellerData {
    @IsUUID()
    SellerId: string;
}
