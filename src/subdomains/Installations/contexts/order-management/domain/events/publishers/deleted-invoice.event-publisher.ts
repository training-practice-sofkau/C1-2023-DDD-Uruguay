import { EventPublisherBase } from 'src/libs';

import { InvoiceDomainEntityBase } from '../../entities';

export abstract class DeletedInvoiceEventPublisherBase<
  Response = InvoiceDomainEntityBase
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "invoice_management.invoice.invoice_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
