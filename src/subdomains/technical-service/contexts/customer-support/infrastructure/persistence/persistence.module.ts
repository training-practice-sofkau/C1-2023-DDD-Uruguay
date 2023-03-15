import { Module } from "@nestjs/common";
import { MySqlModule } from "./databases/mysql";


import { 
    InvoiceService, 
    DeviceService, 
    EmployeeService, 
    CustomerService,
    RepairsService,
    RoleService,
    SupportTicketService,
    WarrantyService,
    EventService
    
} from './services/';

@Module({
    imports: [MySqlModule],
    providers: [
        CustomerService,
        DeviceService,
        EmployeeService,
        InvoiceService,
        RepairsService,
        RoleService,
        SupportTicketService,
        WarrantyService, 
        EventService
    ],
    exports: [
        CustomerService,
        DeviceService,
        EmployeeService,
        InvoiceService,
        RepairsService,
        RoleService,
        SupportTicketService,
        WarrantyService, 
        EventService
        ]
})
export class PersistenceModule { }
