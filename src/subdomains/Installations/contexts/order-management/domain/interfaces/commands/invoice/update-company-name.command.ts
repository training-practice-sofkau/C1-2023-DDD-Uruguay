import { CompanyNameValueObject } from '../../../value-objects/invoice';

export interface IUpdateCompanyNameCommand {
  companyId: string;
  name: string | CompanyNameValueObject;
}
