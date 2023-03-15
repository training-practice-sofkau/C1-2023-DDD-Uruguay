import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ICreateInvoiceCommand } from '../../../../domain/interfaces/';

export class CreateInvoiceCommand implements ICreateInvoiceCommand{
    @IsDate()
    dateEmitted: number;
    @IsString()
    ticketID?: string;
    @IsString()
    customerID?: string;
    @IsNumber()
    invoiceAmount?: number;
    @IsString()
    warrantyID?: string;
    @IsBoolean()
    isPaid?: boolean;
}