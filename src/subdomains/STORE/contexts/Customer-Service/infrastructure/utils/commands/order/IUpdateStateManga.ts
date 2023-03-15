import { IsString, IsUUID } from 'class-validator';
import { UpdateStateManga } from 'src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands';
export class IUpdateStateManga implements UpdateStateManga  {
    @IsUUID()

    MangaId: string;
    @IsString()
    newState: string;
}
