import { IsString, IsNumber } from 'class-validator';
import { IChangeWarrantyEndDateCommand } from '../../../../domain/interfaces';

export class ChangeWarrantyEndDateCommand implements IChangeWarrantyEndDateCommand{
    @IsString()
    warrantyID: string;
    @IsNumber()
    newEndDate: number;    
}