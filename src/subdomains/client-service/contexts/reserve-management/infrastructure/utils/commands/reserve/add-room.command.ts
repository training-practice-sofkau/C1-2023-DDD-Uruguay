import { IsAlphanumeric, IsBoolean, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
import { IAddRoom } from "../../../../domain/interfaces/commands";

export class AddRoomCommand implements IAddRoom {

    @IsUUID()
    roomId: string;

    @IsString()
    @IsAlphanumeric()
    @MaxLength(50)
    location: string;

    @IsString()
    accommodation: string;

    @IsString()
    type: string;

    @IsBoolean()
    state: boolean;

    @IsNumber()
    @MaxLength(2)
    roomNumber: number;

}