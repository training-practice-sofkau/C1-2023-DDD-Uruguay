import {
  EmployedIdValueObject,
  EmployedNameValueObject,
  EmployedPhoneValueObject,
} from '../../value-objects/order';

export interface IEmployedDomainEntity {
  employedId?: string | EmployedIdValueObject;
  name?: string | EmployedNameValueObject;
  phone?: string | EmployedPhoneValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
