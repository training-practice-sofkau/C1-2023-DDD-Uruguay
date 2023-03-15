import { IsUUID } from "class-validator";
import { IGetRoom } from "../../../../domain/interfaces/commands/";

export class GetRoomCommand implements IGetRoom {
    
    @IsUUID()
    roomId: string;
} 