import { EmployedDomainEntityBase } from '../../../entities/order';

export interface ICreateEmployedResponse {
  success: boolean;
  data: EmployedDomainEntityBase | null;
}
