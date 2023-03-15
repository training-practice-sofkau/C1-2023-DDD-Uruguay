import { IsUUID } from "class-validator";
import { IGetRoomKey } from "../../../../domain";

export class GetRoomKeyCommand implements IGetRoomKey {

    @IsUUID()
    roomKeyId: string
}