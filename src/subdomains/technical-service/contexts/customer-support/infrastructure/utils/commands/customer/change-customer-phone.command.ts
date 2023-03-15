import { IsString } from 'class-validator';
import { IChangeCustomerPhoneCommand } from '../../../../domain/interfaces';

export class ChangeCustomerPhoneCommand implements IChangeCustomerPhoneCommand{
    @IsString()
    customerID: string;
    @IsString()
    phoneNumber: string;    
}