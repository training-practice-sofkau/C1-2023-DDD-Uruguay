import { CompanyDomainEntityBase } from '../../../entities/invoice';

export interface ICreateCompanyResponse {
  success: boolean;
  data: CompanyDomainEntityBase | null;
}
