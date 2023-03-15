import { BenefitedCompanyIdValueObject } from '../../../value-objects/order';

export interface IUpdateBenefitedCompanyIdCommand {
  benefitedId: string;
  companyId: string | BenefitedCompanyIdValueObject;
}
