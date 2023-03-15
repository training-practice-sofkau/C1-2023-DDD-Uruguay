import {  IsUUID,  IsNumber } from 'class-validator';
import { UpdatePriceManga } from './../../../../domain/interfaces/commands/Order-commands/Manga-Commands/update-price-command';
import {  } from '../../../../../../../../libs/validations/is-number.validations';
export class IupdateMangaPrice implements UpdatePriceManga {
    @IsUUID()
    MangaId: string;

    @IsNumber()
    newPrice: number;
}
