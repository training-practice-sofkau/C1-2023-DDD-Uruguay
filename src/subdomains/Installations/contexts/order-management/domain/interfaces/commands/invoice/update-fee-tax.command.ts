import { FeeTaxValueObject } from '../../../value-objects/invoice';

export interface IUpdateFeeTaxCommand {
  feeId: string;
  tax: string | FeeTaxValueObject;
}
