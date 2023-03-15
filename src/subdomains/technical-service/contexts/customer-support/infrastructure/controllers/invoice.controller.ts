import { Body, Controller, Post } from "@nestjs/common";

import { CreateCustomerUseCase, CreateInvoiceUseCase, AddWarrantyUseCase, MarkInvoiceAsPaidUseCase } from "../../application";

import {
    CustomerCreatedPublisher,
    InvoiceCreatedPublisher,
    InvoiceMarkedAsPaidPublisher,
    WarrantyAddedPublisher
} from "../messaging";

import { WarrantyService, CustomerService, InvoiceService } from '../persistence/services';

import { 
    MarkInvoiceAsPaidCommand, 
    AddWarrantyCommand, 
    CreateCustomerCommand, 
    CreateInvoiceCommand 
} from "../utils/commands";

@Controller('invoice')
export class InvoiceController {

    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly customerService: CustomerService,
        private readonly warrantyService: WarrantyService,
        private readonly invoiceCreatedEventPublisherBase: InvoiceCreatedPublisher,
        private readonly customerCreatedEventPublisherBase: CustomerCreatedPublisher,
        private readonly warrantyAddedEventPublisherBase: WarrantyAddedPublisher,
        private readonly invoiceMarkedAsPaidEventPublisherBase: InvoiceMarkedAsPaidPublisher,
    ) { }


    // Get HTTP petition to creates a new Invoice
    @Post('/add-invoice')
    async createInvoice(@Body() command: CreateInvoiceCommand) {
        const useCase = new CreateInvoiceUseCase(
            this.invoiceService,
            this.invoiceCreatedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to creates a new Customer
    @Post('/add-customer')
    async createCustomer(@Body() command: CreateCustomerCommand) {
        const useCase = new CreateCustomerUseCase(
            this.customerService,
            this.customerCreatedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to Adds a new Warranty
    @Post('/add-warranty')
    async addWarranty(@Body() command: AddWarrantyCommand) {
        const useCase = new AddWarrantyUseCase(
            this.warrantyService,
            this.warrantyAddedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to updates invoice status
    @Post('/mark-invoice-as-paid')
    async markInvoiceAsPaid(@Body() command: MarkInvoiceAsPaidCommand) {
        const useCase = new MarkInvoiceAsPaidUseCase(
            this.invoiceService,
            this.invoiceMarkedAsPaidEventPublisherBase,
        );
        return await useCase.execute(command);
    }
    
}