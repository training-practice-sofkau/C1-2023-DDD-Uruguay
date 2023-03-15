import { IsString,IsBoolean,IsUUID } from 'class-validator';
import { ICrearTramiteCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/staff-deportivo';

export class CrearTramiteCommand implements ICrearTramiteCommands {
  
    @IsUUID()
    tramiteId?:string ;

    @IsString()
    fecha?: string ;

    @IsUUID()
    negociacionId?: string ;

    @IsUUID()
    equipoSalidaId?: string;

    @IsUUID()
    equipoEntradaId?: string;

    @IsString()
    tipoNegociacion?: string;

    @IsString()
    terminoACumplir?: string;
    
    @IsBoolean()
    state?: boolean;
}