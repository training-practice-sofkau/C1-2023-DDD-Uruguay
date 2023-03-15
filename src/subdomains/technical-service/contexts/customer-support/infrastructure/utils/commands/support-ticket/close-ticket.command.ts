import { IsString } from "class-validator";
import { ICloseTicketCommand } from "../../../../domain/interfaces";

export class CloseTicketCommand implements ICloseTicketCommand{
    @IsString()
    ticketID: string;
    @IsString()
    isOpen: boolean;
}