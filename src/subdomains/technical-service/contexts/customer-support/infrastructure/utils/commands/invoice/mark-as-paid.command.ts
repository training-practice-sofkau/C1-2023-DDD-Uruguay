import { IsBoolean, IsString } from "class-validator";
import { IMarkInvoiceAsPaidCommand } from "../../../../domain/interfaces/";

export class MarkInvoiceAsPaidCommand implements IMarkInvoiceAsPaidCommand{
    @IsString()
    invoiceID: string;
    @IsBoolean()
    isPaid: true;    
}