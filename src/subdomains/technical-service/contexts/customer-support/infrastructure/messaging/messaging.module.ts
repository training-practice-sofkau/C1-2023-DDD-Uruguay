import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";


import {
  CustomerCreatedPublisher,
  CustomerEmailChangedPublisher,
  EmployeeCreatedPublisher,
  EmployeeEmailChangedPublisher,
  RoleCreatedPublisher,
  RoleDescriptionChangedPublisher,
  CustomerPhoneChangedPublisher,
  DeviceAddedPublisher,
  EmployeeStatusChangedPublisher,
  InvoiceCreatedPublisher,
  InvoiceMarkedAsPaidPublisher,
  NewSupportTicketAddedPublisher,
  SupportTicketClosedPublisher,
  RepairsAddedPublisher,
  WarrantyAddedPublisher,
  WarrantyEndDateChangedPublisher,
  WarrantyStatusChangedPublisher,
  WorkStatusChangedPublisher
} from "./publisher";

import {
  DeviceEventsController,
  RepairsEventsController,
  RoleEventsController,
  CustomerEventsController,
  EmployeeEventsController,
  InvoiceEventsController,
  SupportTicketEventsController,
  WarrantyEventsController,
} from "./subscriber";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TECHNICAL-SERVICE_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          }
        }
      },
    ]),
    
  ],
  controllers: [
    CustomerEventsController,
    DeviceEventsController,
    EmployeeEventsController,
    InvoiceEventsController,
    RepairsEventsController,
    RoleEventsController,
    SupportTicketEventsController,
    WarrantyEventsController,
  ],
  providers: [
    CustomerCreatedPublisher,
    CustomerEmailChangedPublisher,
    CustomerPhoneChangedPublisher,
    DeviceAddedPublisher,
    EmployeeCreatedPublisher,
    EmployeeEmailChangedPublisher,
    EmployeeStatusChangedPublisher,
    InvoiceCreatedPublisher,
    InvoiceMarkedAsPaidPublisher,
    NewSupportTicketAddedPublisher,
    SupportTicketClosedPublisher,
    RepairsAddedPublisher,
    RoleCreatedPublisher,
    RoleDescriptionChangedPublisher,
    WarrantyAddedPublisher,
    WarrantyEndDateChangedPublisher,
    WarrantyStatusChangedPublisher,
    WorkStatusChangedPublisher,
    
  ],
  exports: [
    CustomerCreatedPublisher,
    CustomerEmailChangedPublisher,
    CustomerPhoneChangedPublisher,
    DeviceAddedPublisher,
    EmployeeCreatedPublisher,
    EmployeeEmailChangedPublisher,
    EmployeeStatusChangedPublisher,
    InvoiceCreatedPublisher,
    InvoiceMarkedAsPaidPublisher,
    NewSupportTicketAddedPublisher,
    SupportTicketClosedPublisher,
    RepairsAddedPublisher,
    RoleCreatedPublisher,
    RoleDescriptionChangedPublisher,
    WarrantyAddedPublisher,
    WarrantyEndDateChangedPublisher,
    WarrantyStatusChangedPublisher,
    WorkStatusChangedPublisher,
    
  ],
})
export class MessagingModule { }
