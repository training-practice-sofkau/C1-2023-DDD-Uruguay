import { IsString,IsNumber, IsUUID } from 'class-validator';
import { IAgregarEmpleadoCommands } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/interfaces/commands/staff-deportivo';

export class AgregarEmpleadoCommand implements IAgregarEmpleadoCommands {

    @IsUUID()
    empleadoId?:string ;

    @IsString()
    nombre?: string ;

    @IsString()
    documento?: string ;

    @IsString()
    tipoEmpleado?: string;

    @IsString()
    nacionalidad?: string;

    @IsNumber()
    edad?: number;

    @IsNumber()
    salario?: number;
    
}