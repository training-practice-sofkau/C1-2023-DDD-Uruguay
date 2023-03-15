import { IsUUID } from "class-validator";
import { IGetManga } from "../../../../domain/interfaces/commands";

export class IGetMangaCommand implements IGetManga {
    @IsUUID()
    MangaID: string;
}
