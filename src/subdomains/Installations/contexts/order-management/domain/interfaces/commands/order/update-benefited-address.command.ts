import { BenefitedAddressValueObject } from '../../../value-objects/order';

export interface IUpdateBenefitedAddressCommand {
  benefitedId: string;
  address: string | BenefitedAddressValueObject;
}
