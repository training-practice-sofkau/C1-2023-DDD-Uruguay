import { EventPublisherBase } from 'src/libs';

import { EmployedDomainEntityBase } from '../../../entities/order';

export abstract class OrderEmployedDeletedEventPublisherBase<
  Response = EmployedDomainEntityBase
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.order.employed_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
