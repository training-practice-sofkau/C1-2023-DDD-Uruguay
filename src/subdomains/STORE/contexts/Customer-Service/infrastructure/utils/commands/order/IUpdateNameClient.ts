import { UpdateNameClient } from '../../../../domain/interfaces/commands/Order-commands/Client-Command/update-name-command';
import { IsString, IsUUID } from 'class-validator';
export class IUpdateNameClient implements UpdateNameClient {
    @IsUUID()
    ClientID: string;
    @IsString()
    newName: string;
}
