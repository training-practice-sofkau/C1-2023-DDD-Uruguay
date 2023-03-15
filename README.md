# Technical Service DDD Proyect 

## for C1-2023-Training

<hr>

### by Edinson Acosta Gancharov

<hr>




## Summary:

This project implements a solution for a Technical Service using DDD. <br>
The design carried out in the analysis of the business model has been followed. <br>
The knowledge acquired in the master classes has been applied, and based on them, an analysis of the problem (Big Picture) has been carried out. <br>
In addition, the way in which the focus has been made on one of the contexts to be solved (Model) is also explained.
![Big Picture](assets/DDD-ServicioTecnico-EdinsonAcosta-BigPicture-Corrected.png)

### <div align="center">Big Picture </div>

<br>

![Model](assets/DDD-ServicioTecnico-EdinsonAcosta-ClarifiedModel-Corrected.png)

### <div align="center">Model</div>


## First delivery:

This first delivery includes, as requested:

* Business analysis and modeling (assets folder)
* project folder structure
* aggregates, entities, value objects, some validations and other required files.


## Second delivery:

This second delivery includes the implementation of the logic of:

* Domain entities
* Aggregates: invoice & employee (completed), support-ticket (in progress)
* Events: publishers and subscribers for Invoice and Employee Entities
* Interfaces: for all aggregates and entities
* Services: 
    + InvoiceService, CustomerService, WarrantyService, EmployeeService, RoleService, TicketSupportService -> completed
    + DeviceService, RepairService -> inProgress
* ValueObjects: all completed with validations.



## Third delivery:

For this third delivery of the project, 12 use cases (minimum) were implemented as required.

* multiple use cases of creation:

    + CreateRoleUseCase
    + CreateEmployeeUseCase
    + AddWarrantyUseCase
    + CreateCustomerUseCase
    + CreateInvoiceUseCase
    + AddDeviceUseCase
    + OpenNewTicketUseCase

* multiple upgrade use cases
    + ChangeRoleDescriptionUseCase
    + ChangeEmployeeEmailUseCase
    + ChangeEmployeeStatusUseCase
    + ChangeCustomerEmailUseCase
    + ChangeCustomerPhoneUseCase

* Model & BigPicture Updated


## Fourth Delivery:

For this fourth deployment, all the services, repositories and entities corresponding to the infrastructure layer have been implemented, as requested.

Some minor changes have been made to the model to simplify the implementation.

## Fifth Delivery:

For this delivery, as requested, a messaging broker was implemented.

The respective commands, controllers, publishers and subscribers have been created.

An event log was created with its respective entity (EventEntity), service and repository.

There are bugs and some of the use case fail, but in future deployments these issues will be resolved.