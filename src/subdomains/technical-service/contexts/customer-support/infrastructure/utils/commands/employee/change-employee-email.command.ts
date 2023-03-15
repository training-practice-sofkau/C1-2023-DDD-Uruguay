import { IChangeEmployeeMailCommand } from '../../../../domain/interfaces';
import { IsString } from 'class-validator';

export class ChangeEmployeeMailCommand  implements IChangeEmployeeMailCommand{ 
    @IsString()
    employeeID: string; 
    @IsString()
    employeeNewEmail: string;
}