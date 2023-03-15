import { IsUUID } from "class-validator";
import { IGetGuest } from "../../../../domain";

export class GetGuestCommand implements IGetGuest{

    @IsUUID()
    guestId: string
}