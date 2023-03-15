import { Body, Controller, Post } from "@nestjs/common";

import { RepairsService } from '../persistence/services';

import { RepairsAddedPublisher, WorkStatusChangedPublisher } from "../messaging";

import { AddRepairDetailsUseCase, ChangeWorkStatusUseCase } from "../../application";

import { AddRepairsCommand, ChangeWorkStatusCommand } from "../utils/commands";

@Controller('repairs')
export class RepairsController {

    constructor(
        private readonly repairsService: RepairsService,
        private readonly repairsAddedEventPublisherBase: RepairsAddedPublisher,
        private readonly workStatusChangedEventPublisherBase: WorkStatusChangedPublisher,
    ) { }


    // Get HTTP petition to Add repair details
    @Post('/add-repairs')
    async addRepairs(@Body() command: AddRepairsCommand) {
        const useCase = new AddRepairDetailsUseCase(
            this.repairsService,
            this.repairsAddedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to change the repairs Work status
    @Post('/change-work-status')
    async changeWorkStatus(@Body() command: ChangeWorkStatusCommand) {
        const useCase = new ChangeWorkStatusUseCase(
            this.repairsService,
            this.repairsAddedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

}