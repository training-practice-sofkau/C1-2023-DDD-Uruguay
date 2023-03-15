import {
  KitIdValueObject,
  KitModelValueObject,
} from '../../value-objects/order';

export interface IKitDomainEntity {
  kitId?: string | KitIdValueObject;
  model?: string | KitModelValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
