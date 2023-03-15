import { IsBoolean, IsUUID } from "class-validator";
import { IUpdateState } from "../../../../domain";

export class UpdateStateCommand implements IUpdateState{

    @IsUUID()
    roomId?: string;

    @IsBoolean()
    state?: boolean;
}