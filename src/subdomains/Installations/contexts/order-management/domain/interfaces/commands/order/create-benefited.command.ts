import { CompanyIdValueObject } from '../../../value-objects/invoice';

export interface ICreateBenefitedCommand {
  name: string;
  phone: string;
  address: string;
  companyId: string | CompanyIdValueObject;
}
