import { EmployedNameValueObject } from '../../../value-objects/order';

export interface IUpdateEmployedNameCommand {
  employedId: string;
  name: string | EmployedNameValueObject;
}
