import { IsString, IsUUID } from "class-validator";
import { IUpdateEmail } from "../../../../../domain";

export class UpdateEmailCommand implements IUpdateEmail {

    @IsUUID()
    guestId: string;

    @IsString()
    email: string;
}