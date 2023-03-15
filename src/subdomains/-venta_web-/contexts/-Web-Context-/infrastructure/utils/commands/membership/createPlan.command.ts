import { IsString } from "class-validator/types/decorator/decorators";
import { ICreatePlaneMethod } from "../../../../domain/interfaces/commands/membership";


export class ICreatePlanCommand implements ICreatePlaneMethod{

    
    @IsString()
    idPlan: string;
    
    @IsString()
    nombrePlan: string;

    @IsString()
    dateInicioPlan: number;

    @IsString()
    dateFinPlan: number;

    @IsString()
    costoPlan: number;
                     
}