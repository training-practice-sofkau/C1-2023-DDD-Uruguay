import { KitModelValueObject } from '../../../value-objects/order';

export interface IUpdateKitModelCommand {
  kitId: string;
  model: string | KitModelValueObject;
}
