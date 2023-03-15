import { IUpdateTotal } from "../../../../domain/interfaces/commands";
import {  IsUUID, IsNumber } from 'class-validator';

export class IupdateTotalcommand  implements IUpdateTotal{
    @IsUUID()
    idBill: string;
    @IsNumber()
    total: number;
}
