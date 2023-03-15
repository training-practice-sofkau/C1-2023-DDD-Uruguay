import { KitDomainEntityBase } from '../../../entities/order';

export interface ICreateKitResponse {
  success: boolean;
  data: KitDomainEntityBase | null;
}
