import { IsNumber, IsUUID } from "class-validator";
import { IUpdateExtra } from "../../../../../domain";

export class UpdateExtraCommand implements IUpdateExtra {

    @IsUUID()
    consumptionId: string;

    @IsNumber()
    extra: number;
}