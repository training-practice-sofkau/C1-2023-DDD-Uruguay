import { EmployedPhoneValueObject } from '../../../value-objects/order';

export interface IUpdateEmployedPhoneCommand {
  employedId: string;
  phone: string | EmployedPhoneValueObject;
}
