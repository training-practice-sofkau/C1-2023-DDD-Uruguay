import { EventPublisherBase } from 'src/libs';

import { CompanyDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceCompanyDeletedEventPublisherBase<
  Response = CompanyDomainEntityBase
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.invoice.company_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
