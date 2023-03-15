import { IsString, IsUUID, IsNumber } from "class-validator";
import { IAddClient } from "../../../../domain/interfaces/commands/Order-commands";

export class IaddClientCOmmand implements IAddClient {
    @IsUUID()
    ClientID?: string;
    @IsString()
    Name?: string;
    @IsNumber()
    Phone?: number;
}
