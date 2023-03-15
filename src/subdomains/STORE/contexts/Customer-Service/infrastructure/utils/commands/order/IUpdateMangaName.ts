import { IsString, IsUUID } from "class-validator";
import { UpdateNameManga } from "../../../../domain/interfaces/commands/Order-commands";

export class IUpdateMangaName implements UpdateNameManga {
    @IsUUID()
    MangaId: string;
    @IsString()
    newName: string;
}
