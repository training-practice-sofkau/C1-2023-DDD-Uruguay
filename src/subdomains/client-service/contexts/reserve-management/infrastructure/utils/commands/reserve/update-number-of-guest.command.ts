import { IUpdateNumberOfGuests } from "../../../../domain";
import { IsNumber, IsUUID } from "class-validator";

export class UpdateNumberOfGuestsCommand implements IUpdateNumberOfGuests {

    @IsUUID()
    reserveId?: string;

    @IsNumber()
    numberOfGuests?: number;
}