import {
  ICompanyDomainEntity,
  IFeeDomainEntity,
} from '../../entities/interfaces';

export interface ICreateInvoiceCommand {
  invoiceId?: string;
  status?: boolean;
  company: ICompanyDomainEntity;
  fee: IFeeDomainEntity;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
