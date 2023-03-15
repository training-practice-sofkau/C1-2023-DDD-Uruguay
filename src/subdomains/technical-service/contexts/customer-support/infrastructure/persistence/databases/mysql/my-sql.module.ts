import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmMySqlConfigService } from './configs/type-orm.mysql.service';

import { 
    RepairsRepository, 
    InvoiceRepository,
    RoleRepository,
    SupportTicketRepository,
    WarrantyRepository,
    EmployeeRepository, 
    DeviceRepository, 
    CustomerRepository, 
    EventRepository
} from './repositories/';

import { 
    RepairsMySqlEntity, 
    DeviceMySqlEntity, 
    InvoiceMySqlEntity, 
    CustomerMySqlEntity,
    EmployeeMySqlEntity,
    WarrantyMySqlEntity,
    RoleMySqlEntity,
    SupportTicketMySqlEntity, 
    EventMySqlEntity,
} from './entities/';

import { 
    EmployeeMySqlService,
    DeviceMySqlService, 
    CustomerMySqlService,
    InvoiceMySqlService,
    RepairsMySqlService,
    RoleMySqlService,
    SupportTicketMySqlService,
    WarrantyMySqlService,
    EventMySqlService,
} from './services/';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmMySqlConfigService,
        }),

        TypeOrmModule.forFeature([
            CustomerMySqlEntity,
            InvoiceMySqlEntity,
            EmployeeMySqlEntity,
            DeviceMySqlEntity,
            RepairsMySqlEntity,
            RoleMySqlEntity,
            SupportTicketMySqlEntity,
            WarrantyMySqlEntity,
            EventMySqlEntity

        ]),
    ],
    controllers:[
        
    ],
    providers:[
        TypeOrmMySqlConfigService,
        CustomerMySqlService,
        DeviceMySqlService,
        EmployeeMySqlService,
        InvoiceMySqlService,
        RepairsMySqlService,
        RoleMySqlService,
        SupportTicketMySqlService,
        WarrantyMySqlService,
        EventMySqlService,

        CustomerRepository,
        DeviceRepository,
        EmployeeRepository,
        InvoiceRepository,
        RepairsRepository,
        RoleRepository,
        SupportTicketRepository,
        WarrantyRepository,
        EventRepository

    ],
    exports:[
        CustomerMySqlService,
        DeviceMySqlService,
        EmployeeMySqlService,
        InvoiceMySqlService,
        RepairsMySqlService,
        RoleMySqlService,
        SupportTicketMySqlService,
        WarrantyMySqlService,
        EventMySqlService,

        CustomerRepository,
        DeviceRepository,
        EmployeeRepository,
        InvoiceRepository,
        RepairsRepository,
        RoleRepository,
        SupportTicketRepository,
        WarrantyRepository,
        EventRepository
    ],
})
export class MySqlModule {}