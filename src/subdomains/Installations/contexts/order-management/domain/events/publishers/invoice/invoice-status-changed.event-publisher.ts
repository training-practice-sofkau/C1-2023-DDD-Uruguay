import { EventPublisherBase } from "src/libs";

import { InvoiceStatusValueObject } from "../../../value-objects/invoice";

export abstract class InvoiceStatusChangedEventPublisherBase<
  Response = InvoiceStatusValueObject
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.invoice.status_changed",
      JSON.stringify({ data: this.response })
    );
  }
}
