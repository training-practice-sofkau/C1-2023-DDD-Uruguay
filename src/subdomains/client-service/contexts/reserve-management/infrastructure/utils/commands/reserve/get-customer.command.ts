import { IsUUID } from "class-validator";
import { IGetCustomer } from "../../../../domain";

export class GetCustomerCommand implements IGetCustomer {

    @IsUUID()
    customerId: string;
} 