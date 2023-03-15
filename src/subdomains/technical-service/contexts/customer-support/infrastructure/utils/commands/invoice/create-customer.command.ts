import { IsString } from 'class-validator';
import { ICreateCustomerCommand } from '../../../../domain/interfaces';

export class CreateCustomerCommand implements ICreateCustomerCommand{
    @IsString()
    customerName: string;
    @IsString()
    customerEmail: string;
    @IsString()
    customerPhone: string;     
}