import { IsDate, IsUUID } from "class-validator";
import { IUpdateStartDate } from "../../../../domain";

export class UpdateStartDateCommand implements IUpdateStartDate {

    @IsUUID()
    reserveId?: string;

    @IsDate()
    Date?: Date;
}