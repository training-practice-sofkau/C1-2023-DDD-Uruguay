import { CompanyBankAccountValueObject } from "../../../value-objects/invoice";

export interface IUpdateCompanyBankAccountCommand {
  invoiceId: string;
  bankAccount: CompanyBankAccountValueObject;
}