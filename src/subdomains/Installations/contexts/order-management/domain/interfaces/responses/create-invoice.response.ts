import { InvoiceDomainEntityBase } from '../../entities';

export interface ICreateInvoiceResponse {
  success: boolean;
  data: InvoiceDomainEntityBase | null;
}
