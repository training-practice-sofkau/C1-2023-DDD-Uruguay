import { IsString } from 'class-validator';
import { IChangeWarrantyStatusCommand } from '../../../../domain/interfaces';

export class ChangeWarrantyStatusCommand implements IChangeWarrantyStatusCommand{
    @IsString()
    warrantyID: string;
    @IsString()
    warrantyStatus: string;
    @IsString()
    reason: string;    
}