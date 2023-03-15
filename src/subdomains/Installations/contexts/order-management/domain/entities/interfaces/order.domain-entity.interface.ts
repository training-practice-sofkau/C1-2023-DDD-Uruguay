import {
  OrderIdValueObject,
  OrderStatusValueObject,
} from '../../value-objects/order/';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
} from '../order';

export interface IOrderDomainEntity {
  orderId?: string | OrderIdValueObject;
  status?: boolean | OrderStatusValueObject;
  kit: KitDomainEntityBase;
  employed: EmployedDomainEntityBase;
  benefited: BenefitedDomainEntityBase;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
