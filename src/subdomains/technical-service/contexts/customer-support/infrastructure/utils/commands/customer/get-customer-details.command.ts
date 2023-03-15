import { IsString } from 'class-validator';
import { IGetCustomerDetailsCommand } from '../../../../domain/interfaces/';

export class GetCustomerDetailsCommand implements IGetCustomerDetailsCommand{
    @IsString()
    customerID: string;
    @IsString()
    Email: string;
    @IsString()
    Phone: string;    
}