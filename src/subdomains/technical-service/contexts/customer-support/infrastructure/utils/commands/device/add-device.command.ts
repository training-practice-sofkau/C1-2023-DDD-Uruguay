import { IsString } from "class-validator";
import { IAddDeviceCommand } from "../../../../domain/interfaces";

export class AddDeviceCommand implements IAddDeviceCommand{
    @IsString()
    deviceType: string;
    @IsString()
    issues: string;
}