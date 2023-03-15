import { IsUUID } from "class-validator";
import { IRegisterSale } from "../../../../domain/interfaces/commands";

export class IRegisterSaleCommand implements IRegisterSale{
    @IsUUID()
    Billid: string;
    @IsUUID()
    Sellerid: string;
    @IsUUID()
    IDSale: string;
     @IsUUID()
    IDOrder: string;
}
