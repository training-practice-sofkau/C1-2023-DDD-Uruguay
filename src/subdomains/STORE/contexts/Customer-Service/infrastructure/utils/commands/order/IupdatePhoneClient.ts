import { IsString, IsUUID } from 'class-validator';
import { UpdatePhoneClient } from 'src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands';
export class IupdatePhoneClient implements  UpdatePhoneClient{
    @IsUUID()
    ClientID: string;
    @IsString()
    Phone: number;
}
