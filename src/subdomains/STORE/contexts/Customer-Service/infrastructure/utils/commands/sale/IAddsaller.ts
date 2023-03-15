import { IsString, IsUUID } from "class-validator";
import { IAddSaller } from "../../../../domain/interfaces/commands";

export class IAddsallerCommand implements IAddSaller {
    @IsUUID()
    IdSeller: string;
    @IsString()
    Name: string;
}
