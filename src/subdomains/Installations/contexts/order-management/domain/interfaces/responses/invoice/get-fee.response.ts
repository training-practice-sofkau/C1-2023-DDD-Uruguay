import { FeeDomainEntityBase } from '../../../entities';

export interface IGetFeeResponse {
  success: boolean;
  data: FeeDomainEntityBase | null;
}
