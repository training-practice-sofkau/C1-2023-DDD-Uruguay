import { IsNumber, IsUUID } from "class-validator";
import { IUpdateCost } from "../../../../../domain";

export class UpdateCostCommand implements IUpdateCost {

    @IsUUID()
    invoiceId: string;

    @IsNumber()
    cost: number;
}