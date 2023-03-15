import { PlanDomainEntity } from "../entities/membership/plan.domain-entity";
import { IUpdateCostoMethod } from "../interfaces/commands/compra/curso/updateCosto.command"
import { ICreatePlanMethod } from "../interfaces/commands/membership/createPlan.command";
import { IUpdateNombreMethod } from "../interfaces/commands/membership/plan/updateNombre.command"


export interface IPlanService {

    //updateNombre(idPlan : string, nombre : string) : Promise<string>
    //updateCosto(idPlan : string, costo : number) : Promise<number>
    
    createPlan(plan : ICreatePlanMethod) : Promise<PlanDomainEntity>;
    updateNombre(data : IUpdateNombreMethod) : Promise<string> 
    updateCosto(data : IUpdateCostoMethod) : Promise<number>

    obtenerPlan(plane : string) : Promise <PlanDomainEntity>;

}
