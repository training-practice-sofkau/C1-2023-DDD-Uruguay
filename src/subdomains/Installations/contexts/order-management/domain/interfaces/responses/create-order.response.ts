import { OrderDomainEntityBase } from '../../entities';

export interface ICreateOrderResponse {
  success: boolean;
  data: OrderDomainEntityBase | null;
}
