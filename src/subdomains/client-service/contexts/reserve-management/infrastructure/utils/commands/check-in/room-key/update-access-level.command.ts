import { IsString, IsUUID } from "class-validator";
import { IUpdateAccessLevel } from "../../../../../domain";

export class UpdateAccessLevelCommand implements IUpdateAccessLevel {

    @IsUUID()
    roomKeyId?: string;

    @IsString()
    accessLevel?: string;
}