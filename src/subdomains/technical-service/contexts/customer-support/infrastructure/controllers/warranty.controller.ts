import { Body, Controller, Post } from "@nestjs/common";

import { WarrantyService } from '../persistence/services';

import { WarrantyStatusChangedPublisher, WarrantyEndDateChangedPublisher } from "../messaging";

import { ChangeWarrantyStatusUseCase, ChangeWarrantyEndDateUseCase } from "../../application";

import { ChangeWarrantyStatusCommand, ChangeWarrantyEndDateCommand } from "../utils/commands";


@Controller('warranty')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService,
        private readonly warrantyStatusChangedEventPublisherBase: WarrantyStatusChangedPublisher,
        private readonly warrantyEndDateChangedEventPublisherBase: WarrantyEndDateChangedPublisher,
    ) { }


    // Get HTTP petition to change warranty status
    @Post('/change-status')
    async changeStatus(@Body() command: ChangeWarrantyStatusCommand) {
        const useCase = new ChangeWarrantyStatusUseCase(
            this.warrantyService,
            this.warrantyStatusChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to change warranty End Date
    @Post('/change-end-date')
    async changeEndDate(@Body() command: ChangeWarrantyEndDateCommand) {
        const useCase = new ChangeWarrantyEndDateUseCase(
            this.warrantyService,
            this.warrantyEndDateChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }


}