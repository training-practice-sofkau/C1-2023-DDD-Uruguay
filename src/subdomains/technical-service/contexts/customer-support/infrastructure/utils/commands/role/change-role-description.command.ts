import { IsString } from 'class-validator';
import { IChangeRoleDescriptionCommand } from '../../../../domain/interfaces/commands';

export class ChangeRoleDescriptionCommand implements IChangeRoleDescriptionCommand{
    @IsString()
    roleID: string;

    @IsString()
    newDescription: string;  
}