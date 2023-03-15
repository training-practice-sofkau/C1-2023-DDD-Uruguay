import { IsString } from "class-validator";
import { IChangeWorkStatusCommand } from "../../../../domain/interfaces";

export class ChangeWorkStatusCommand implements IChangeWorkStatusCommand{
    @IsString()
    repairID: string;
    @IsString()
    newStatus: boolean;    
}