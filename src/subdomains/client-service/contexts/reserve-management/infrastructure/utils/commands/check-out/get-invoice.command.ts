import { IsUUID } from "class-validator";
import { IGetInvoice } from "../../../../domain";

export class GetInvoiceCommand implements IGetInvoice{

    @IsUUID()
    invoiceId: string
}