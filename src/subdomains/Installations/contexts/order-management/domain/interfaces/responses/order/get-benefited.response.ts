import { BenefitedDomainEntityBase } from '../../../entities';

export interface IGetBenefitedResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
