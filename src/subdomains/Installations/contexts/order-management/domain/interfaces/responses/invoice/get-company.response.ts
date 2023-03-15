import { CompanyDomainEntityBase } from '../../../entities';

export interface IGetCompanyResponse {
  success: boolean;
  data: CompanyDomainEntityBase | null;
}
