import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { 
    DeviceMySqlEntity, 
    CustomerMySqlEntity,
    EventMySqlEntity,
    WarrantyMySqlEntity,
    SupportTicketMySqlEntity,
    RepairsMySqlEntity,
    RoleMySqlEntity,
    InvoiceMySqlEntity,
    EmployeeMySqlEntity
} from '../entities';

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService: ConfigService) { }

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password:  this.configService.get<string>('DB_PASSWORD'),
            database:  this.configService.get<string>('DB_NAME'),
            entities:[
                CustomerMySqlEntity, 
                DeviceMySqlEntity, 
                EmployeeMySqlEntity,
                InvoiceMySqlEntity,
                RoleMySqlEntity,
                RepairsMySqlEntity,
                SupportTicketMySqlEntity,
                WarrantyMySqlEntity,
                EventMySqlEntity
            ],
            synchronize: true,
        }
    }
}
