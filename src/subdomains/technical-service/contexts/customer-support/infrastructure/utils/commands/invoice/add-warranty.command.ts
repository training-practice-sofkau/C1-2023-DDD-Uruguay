import { IsNumber, IsString } from "class-validator";
import { IAddWarrantyCommand } from "../../../../domain/interfaces";

export class AddWarrantyCommand implements IAddWarrantyCommand{
    @IsNumber()
    startDate: number;
    @IsNumber()
    endDate: number;
    @IsString()
    warrantyStatus: string;    
}