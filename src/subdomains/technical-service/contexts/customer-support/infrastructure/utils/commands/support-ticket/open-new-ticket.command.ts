import { IsNumber, IsString } from "class-validator";
import { IOpenNewTicketCommand } from "../../../../domain/interfaces";

export class OpenNewTicketCommand implements IOpenNewTicketCommand{
    @IsString()
    ticketID: string;
    @IsNumber()
    openDate: number;
    @IsString()
    deviceID: string; 
    @IsString()
    employeeID: string;     
}