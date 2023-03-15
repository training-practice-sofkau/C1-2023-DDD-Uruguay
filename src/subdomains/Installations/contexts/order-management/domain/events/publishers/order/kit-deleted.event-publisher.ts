import { EventPublisherBase } from 'src/libs';

import { KitDomainEntityBase } from '../../../entities/order';

export abstract class OrderKitDeletedEventPublisherBase<
  Response = KitDomainEntityBase
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.kit_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
