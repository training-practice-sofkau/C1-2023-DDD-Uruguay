import { IChangeEmployeeStatusCommand } from '../../../../domain/interfaces/';
import { IsBoolean, IsString } from 'class-validator';

export class ChangeEmployeeStatusCommand implements IChangeEmployeeStatusCommand {    
    @IsString()
    employeeID: string; 
    @IsBoolean()
    newStatus: boolean;
}