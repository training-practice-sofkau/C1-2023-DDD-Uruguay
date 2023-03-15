import { FeeDomainEntityBase } from '../../../entities/invoice';

export interface ICreateFeeResponse {
  success: boolean;
  data: FeeDomainEntityBase | null;
}
