import { ClienteDomainEntity } from "../entities/common-entities/cliente.domain-entity";
import { MembershipDomainEntity } from "../entities/membership/membership.domain-entity";
import { PlanDomainEntity } from "../entities/membership/plan.domain-entity";
import { ICreateClienteMethod } from "../interfaces/commands/compra/createCliente.command";
import { ICreateMembershipMethod } from "../interfaces/commands/membership/createMembership.command";
import { ICreatePlanMethod } from "../interfaces/commands/membership/createPlan.command";




export interface IMembershipService{

 
    createMembership(membership : ICreateMembershipMethod  ) : Promise<MembershipDomainEntity>;
 


}
