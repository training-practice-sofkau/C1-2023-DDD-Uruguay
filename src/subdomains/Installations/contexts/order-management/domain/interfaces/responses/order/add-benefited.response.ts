import { BenefitedDomainEntityBase } from '../../../entities/order';

export interface ICreateBenefitedResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
