import { IsString } from 'class-validator';
import { IChangeCustomerEmailCommand } from '../../../../domain/interfaces';

export class ChangeCustomerEmailCommand implements IChangeCustomerEmailCommand{
    @IsString()
    customerID: string;
    @IsString()
    newEmail: string;    
}