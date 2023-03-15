import { ClienteDomainEntity } from "../../../entities";
import { PlanDomainEntity } from "../../../entities/membership/plan.domain-entity";

export interface IPlanCreadoResponse {

    success: boolean;
    data: PlanDomainEntity | null;
}