import { EventPublisherBase } from "src/libs";

import { OrderStatusValueObject } from "../../../value-objects/order";

export abstract class OrderStatusChangedEventPublisherBase<
  Response = OrderStatusValueObject
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.status_changed",
      JSON.stringify({ data: this.response })
    );
  }
}
