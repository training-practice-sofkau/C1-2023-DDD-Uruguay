import { IsNumber, IsUUID } from "class-validator";
import { UpdatePaymentMethod } from "../../../../domain/interfaces/commands";

export class IupdatePaymentMethod implements UpdatePaymentMethod {
    @IsUUID()
    idBill: string;
    @IsNumber()
    paymentMethod: number;
}
