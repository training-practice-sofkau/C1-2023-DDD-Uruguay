import { CostoValueObject } from "../../value-objects/common-value-objects/costo/costo.value-object";
import { DateValueObject } from "../../value-objects/common-value-objects/date/date.value-object";
import { FullnameValueObject } from "../../value-objects/common-value-objects/fullname/fullname.value-object";
import { UuidValueObject } from "../../value-objects/common-value-objects/uuid/uuid.value-object";

export interface IPlanDomainEntityInterface {

    idPlan? : string | UuidValueObject;
    nombrePlan? : string | FullnameValueObject;
    dateInicioPlan? : number | DateValueObject;
    dateFinPlan? : number | DateValueObject;
    costoPlan? : number | CostoValueObject;
    
}
