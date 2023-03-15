import { IBillCommand } from "../../../../domain/interfaces/commands";
import { IsUUID } from 'class-validator';

export class IGetBill implements  IBillCommand {
    @IsUUID()
    BillID: string;
}
