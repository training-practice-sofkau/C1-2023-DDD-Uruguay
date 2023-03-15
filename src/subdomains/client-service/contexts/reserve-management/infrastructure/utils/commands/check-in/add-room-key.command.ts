import { IsNumber, IsString, IsUUID } from "class-validator";
import { IAddRoomKey } from "../../../../domain";

export class AddRoomKeyCommand implements IAddRoomKey {

    @IsUUID()
    roomKeyId: string;

    @IsNumber()
    roomNumber: number;

    @IsString()
    accessLevel: string;
}