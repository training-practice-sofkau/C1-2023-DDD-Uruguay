import { v4 as uuidv4 } from 'uuid';

import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../value-objects/invoice';
import { IFeeDomainEntity } from '../interfaces';

export class FeeDomainEntityBase implements IFeeDomainEntity {
  feeId?: string | FeeIdValueObject;
  tax?: number | FeeTaxValueObject;
  charge?: number | FeeChargeValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor(_data?: IFeeDomainEntity) {
    if (_data?.feeId) this.feeId = _data.feeId;
    else this.feeId = uuidv4();

    if (_data?.tax) this.tax = _data.tax;

    if (_data?.charge) this.charge = _data.charge;

    this.createdAt = Date.now();
  }
}
