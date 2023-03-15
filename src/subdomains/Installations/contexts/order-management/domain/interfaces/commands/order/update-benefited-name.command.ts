import { BenefitedNameValueObject } from '../../../value-objects/order';

export interface IUpdateBenefitedNameCommand {
  benefitedId: string;
  name: string | BenefitedNameValueObject;
}
