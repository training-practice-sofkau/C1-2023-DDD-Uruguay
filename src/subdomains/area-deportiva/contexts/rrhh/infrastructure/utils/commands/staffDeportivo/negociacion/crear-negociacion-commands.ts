import { IsString,IsBoolean ,IsUUID} from 'class-validator';
import { ICrearNegociacionCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/tramite';

export class CrearNegociacionCommand implements ICrearNegociacionCommands {
  
    @IsUUID()
    negociacionId?:string ;

    @IsUUID()
    equipoSalidaId?: string ;

    @IsUUID()
    equipoEntradaId?: string ;

    @IsString()
    tipoNegociacion?: string;

    @IsString()
    terminoACumplir?: string;

    @IsBoolean()
    state?: boolean;
}