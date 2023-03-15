import { IsDate, IsNumber, IsUUID } from "class-validator";
import { ICreateReserve } from "../../../../domain";


export class CreateReserveCommand implements ICreateReserve{

    @IsUUID()
    reserveId?: string;

    @IsDate()
    startDate?: Date;

    @IsDate()
    endDate?: Date;

    @IsNumber()
    numberOfGuests: number;

    @IsUUID()
    roomId: string;
    
    @IsUUID()
    customerId: string;

}