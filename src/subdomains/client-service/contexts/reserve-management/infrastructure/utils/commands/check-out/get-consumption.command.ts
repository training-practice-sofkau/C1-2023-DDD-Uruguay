import { IsUUID } from "class-validator";
import { IGetConsumption } from "../../../../domain";

export class GetConsumptionCommand implements IGetConsumption{

    @IsUUID()
    consumptionId: string
}