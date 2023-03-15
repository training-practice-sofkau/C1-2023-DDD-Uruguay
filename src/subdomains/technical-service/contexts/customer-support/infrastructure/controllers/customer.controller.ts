import { Body, Controller, Post } from "@nestjs/common";

import { CustomerService } from '../persistence/services';

import { CustomerPhoneChangedPublisher, CustomerEmailChangedPublisher } from "../messaging";

import { ChangeCustomerEmailUseCase, ChangeCustomerPhoneUseCase } from "../../application";

import { ChangeCustomerEmailCommand, ChangeCustomerPhoneCommand } from "../utils/commands";

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService,
        private readonly customerEmailChangedEventPublisherBase: CustomerEmailChangedPublisher,
        private readonly customerPhoneChangedEventPublisherBase: CustomerPhoneChangedPublisher,
    ) { }


    // Get HTTP petition to change customer email
    @Post('/change-email')
    async changeEmail(@Body() command: ChangeCustomerEmailCommand) {
        const useCase = new ChangeCustomerEmailUseCase(
            this.customerService,
            this.customerEmailChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to change customer phone
    @Post('/change-phone')
    async changePhone(@Body() command: ChangeCustomerPhoneCommand) {
        const useCase = new ChangeCustomerPhoneUseCase(
            this.customerService,
            this.customerPhoneChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to return Customer Details
   /* @Get()
    async getDetails(command: GetCustomerDetailsCommand) {
        const useCase = new GetCustomerDetailsUseCase(
            this.customerService,
            this.gotCustomerDetailsEventPublisherBase,
        );
        return await useCase.execute(command);
    }*/

}