import { KitDomainEntityBase } from '../../../entities';

export interface IGetKitResponse {
  success: boolean;
  data: KitDomainEntityBase | null;
}
