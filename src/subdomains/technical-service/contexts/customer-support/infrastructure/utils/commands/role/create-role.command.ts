import { IsString } from 'class-validator';
import { ICreateRoleCommand } from '../../../../domain/interfaces';

export class CreateRoleCommand implements ICreateRoleCommand {
    @IsString()
    roleName: string;

    @IsString()
    roleDescription: string;  
    
}