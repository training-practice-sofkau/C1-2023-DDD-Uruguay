import { IGetClient } from "../../../../domain/interfaces/commands";
import { IsUUID } from 'class-validator';

export class IGetClientCommand implements IGetClient  {
    @IsUUID()
    ClientID: string;
}