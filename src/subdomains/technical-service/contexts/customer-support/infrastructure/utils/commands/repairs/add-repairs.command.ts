import { IsString } from "class-validator";
import { IAddRepairsCommand } from "../../../../domain/interfaces";

export class AddRepairsCommand implements IAddRepairsCommand{
    @IsString()
    repairID: string ;
    @IsString()
    repairToAdd: string;
}