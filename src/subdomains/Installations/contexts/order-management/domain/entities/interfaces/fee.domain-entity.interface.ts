import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../value-objects/invoice';

export interface IFeeDomainEntity {
  feeId?: string | FeeIdValueObject;
  tax?: number | FeeTaxValueObject;
  charge?: number | FeeChargeValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
