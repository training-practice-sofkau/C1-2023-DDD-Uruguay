import { OrderDomainEntityBase } from '../../entities';
import { CreatedOrderEventPublisherBase } from '../../events';
import { IOrderDomainService } from '../../services';

export const CreateOrder = async (
  order: OrderDomainEntityBase,
  orderService: IOrderDomainService,
  createdOrderEventPublisher: CreatedOrderEventPublisherBase
): Promise<OrderDomainEntityBase | null> => {
  //const result = await orderService.createOrder(order);
  createdOrderEventPublisher.response = order;
  createdOrderEventPublisher.publish();
  return order;
};
