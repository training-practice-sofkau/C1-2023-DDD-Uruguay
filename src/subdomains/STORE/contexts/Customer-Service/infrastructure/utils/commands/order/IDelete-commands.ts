import { IsUUID } from 'class-validator';
import { IDeleteOrder } from 'src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands';
export class IDeleteCommands implements   IDeleteOrder{
    @IsUUID()
    OrderID: string;
} 
 