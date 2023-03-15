import { BenefitedPhoneValueObject } from '../../../value-objects/order';

export interface IUpdateBenefitedPhoneCommand {
  benefitedId: string;
  phone: string | BenefitedPhoneValueObject;
}
