import { v4 as uuidv4 } from 'uuid';

import {
  BenefitedAddressValueObject,
  BenefitedCompanyIdValueObject,
  BenefitedIdValueObject,
  BenefitedNameValueObject,
  BenefitedPhoneValueObject,
} from '../../value-objects/order';
import { IBenefitedDomainEntity } from '../interfaces';

export class BenefitedDomainEntityBase implements IBenefitedDomainEntity {
  benefitedId?: string | BenefitedIdValueObject;
  name?: string | BenefitedNameValueObject;
  phone?: string | BenefitedPhoneValueObject;
  address?: string | BenefitedAddressValueObject;
  companyId?: string | BenefitedCompanyIdValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor(_data?: IBenefitedDomainEntity) {
    if (_data?.benefitedId) this.benefitedId = _data.benefitedId;
    else this.benefitedId = uuidv4();

    if (_data?.name) this.name = _data.name;

    if (_data?.phone) this.phone = _data.phone;

    if (_data?.address) this.address = _data.address;

    if (_data?.companyId) this.companyId = _data.companyId;

    this.createdAt = Date.now();
  }
}
