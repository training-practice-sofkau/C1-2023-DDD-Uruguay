import { IsAlpha, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
import { IAddCustomer } from "../../../../domain/interfaces/commands";

export class AddCustomerCommand implements IAddCustomer {

    @IsUUID()
    customerId?: string;

    @IsString()
    @IsAlpha()
    @MaxLength(50)
    fullName?: string;

    @IsNumber()
    @MaxLength(10)
    document?: number;

    @IsString()
    paymentMethod?: string;

}