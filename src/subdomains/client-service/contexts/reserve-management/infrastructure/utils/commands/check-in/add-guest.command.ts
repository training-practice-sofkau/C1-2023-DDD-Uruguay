import { IsNumber, IsString, IsUUID } from "class-validator";
import { IAddGuest } from "../../../../domain";


export class AddGuestCommand implements IAddGuest {

    @IsUUID()
    guestId: string;

    @IsString()
    fullName: string;

    @IsNumber()
    document: number;

    @IsString()
    phone: string;

    @IsString()
    email: string;
}