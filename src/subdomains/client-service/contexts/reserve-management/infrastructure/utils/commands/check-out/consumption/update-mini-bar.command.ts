import { IsNumber, IsUUID } from "class-validator";
import { IUpdateMiniBar } from "../../../../../domain";


export class UpdateMiniBarCommand implements IUpdateMiniBar {

    @IsUUID()
    consumptionId: string;

    @IsNumber()
    miniBar: number;
}