import { IsNumber, IsString } from 'class-validator';
import { IGetWarrantyDetailsCommand } from '../../../../domain/interfaces';


export class GetWarrantyDetailsCommand implements IGetWarrantyDetailsCommand{
    @IsString()
    warrantyID: string;
    @IsNumber()
    startDate: number;
    @IsString()
    warrantyStatus: string;
    @IsNumber()
    endDate: number;   
      
}