import { IsString,IsUUID } from 'class-validator';
import { ICrearStaffDeportivoCommands } from '../../../../domain/interfaces/commands/staff-deportivo';

export class CrearStaffDeportivoCommand implements ICrearStaffDeportivoCommands {

    @IsUUID()
    staffDeportivoId?:string ;
    @IsString()
    nombre?: string ;
    @IsUUID()
    tamite?: string ;
    @IsUUID()
    empleado?: string;
   
    
}