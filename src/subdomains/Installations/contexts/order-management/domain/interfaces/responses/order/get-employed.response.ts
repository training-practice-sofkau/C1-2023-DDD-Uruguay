import { EmployedDomainEntityBase } from '../../../entities';

export interface IGetEmployedResponse {
  success: boolean;
  data: EmployedDomainEntityBase | null;
}
