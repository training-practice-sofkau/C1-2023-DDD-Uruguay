import { IBuscarContratoCommands } from "src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/secretaria";
import {  IsUUID} from 'class-validator';

export class BuscarcontratoCommand implements IBuscarContratoCommands {
    
    @IsUUID()
    contratoId: string;

}