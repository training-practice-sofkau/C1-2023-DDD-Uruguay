import { IUpdateMangaStock } from "../../../../domain/interfaces/commands";
import { IsNumber,  IsUUID } from 'class-validator';

export class IUpdateMangaStockCommand implements IUpdateMangaStock {

    @IsUUID()
    MangaId: string;
    @IsNumber()
    MangaStock: number;
}
