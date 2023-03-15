import { IsUUID } from "class-validator";
import { IGetSalesList } from "../../../../domain/interfaces/commands";

export class IGetSales  implements IGetSalesList{
    @IsUUID()
    IdSale: string;
}
