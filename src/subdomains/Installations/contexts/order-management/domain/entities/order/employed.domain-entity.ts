import { v4 as uuidv4 } from 'uuid';

import {
  EmployedIdValueObject,
  EmployedNameValueObject,
  EmployedPhoneValueObject,
} from '../../value-objects/order';
import { IEmployedDomainEntity } from '../interfaces';

export class EmployedDomainEntityBase implements IEmployedDomainEntity {
  employedId?: string | EmployedIdValueObject;
  name?: string | EmployedNameValueObject;
  phone?: string | EmployedPhoneValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor(_data?: IEmployedDomainEntity) {
    if (_data?.employedId) this.employedId = _data.employedId;
    else this.employedId = uuidv4();

    if (_data?.name) this.name = _data.name;

    if (_data?.phone) this.phone = _data.phone;

    this.createdAt = Date.now();
  }
}
