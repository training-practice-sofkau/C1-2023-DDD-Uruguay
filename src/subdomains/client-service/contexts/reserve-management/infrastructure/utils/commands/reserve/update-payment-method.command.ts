import { IsString, IsUUID } from "class-validator";
import { IUpdatePaymentMethod } from "../../../../domain";

export class UpdatePaymentMethodCommand implements IUpdatePaymentMethod {

    @IsUUID()
    customerId?: string;

    @IsString()
    paymentMethod?: string;
}