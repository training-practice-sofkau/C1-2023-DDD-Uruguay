import { IsString, IsUUID, IsDate } from 'class-validator';
import { ICreateCheckIn } from "../../../../domain";

export class CreateCheckInCommand implements ICreateCheckIn {

    @IsUUID()
    checkInId: string;

    @IsDate()
    startDate: Date;

    @IsString()
    recepsionistName: string;

    @IsUUID()
    roomKeyId: string;

    @IsUUID()
    guestId: string;
}