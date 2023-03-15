import { v4 as uuidv4 } from 'uuid';

import {
  OrderIdValueObject,
  OrderStatusValueObject,
} from '../value-objects/order';
import { IOrderDomainEntity } from './interfaces';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
} from './order';

export class OrderDomainEntityBase implements IOrderDomainEntity {
  orderId?: string | OrderIdValueObject;
  status?: boolean | OrderStatusValueObject;
  kit: KitDomainEntityBase;
  employed: EmployedDomainEntityBase;
  benefited: BenefitedDomainEntityBase;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor(_data?: IOrderDomainEntity) {
    if (_data?.orderId) this.orderId = _data.orderId;
    else this.orderId = uuidv4();

    if (_data?.status) this.status = _data.status;
    else this.status = true;

    if (_data?.kit) this.kit = _data.kit;

    if (_data?.employed) this.employed = _data.employed;

    if (_data?.benefited) this.benefited = _data.benefited;

    this.createdAt = Date.now();
  }
}
