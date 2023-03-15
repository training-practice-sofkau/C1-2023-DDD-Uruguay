import { EventPublisherBase } from 'src/libs';

import { InvoiceDomainEntityBase } from '../../entities';

export abstract class GettedInvoiceEventPublisherBase<
  Response = InvoiceDomainEntityBase
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.invoice.invoice_getted",
      JSON.stringify({ data: this.response })
    );
  }
}
