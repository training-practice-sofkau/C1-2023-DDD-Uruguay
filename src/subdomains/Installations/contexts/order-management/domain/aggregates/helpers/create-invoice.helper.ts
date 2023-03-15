import { InvoiceDomainEntityBase } from '../../entities';
import { CreatedInvoiceEventPublisherBase } from '../../events';
import { IInvoiceDomainService } from '../../services';

export const CreateInvoice = async (
  invoice: InvoiceDomainEntityBase,
  invoiceService: IInvoiceDomainService,
  createdInvoiceEventPublisher: CreatedInvoiceEventPublisherBase
): Promise<InvoiceDomainEntityBase | null> => {
  const result = await invoiceService.createInvoice(invoice);
  createdInvoiceEventPublisher.response = result;
  createdInvoiceEventPublisher.publish();
  return result;
};
