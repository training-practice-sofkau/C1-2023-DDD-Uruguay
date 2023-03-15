import { DeleteSale } from "../../../../domain/interfaces/commands";
import { IsUUID } from 'class-validator';

export class IDeleteSale implements DeleteSale{
    @IsUUID()
    IDSale: string;
}
