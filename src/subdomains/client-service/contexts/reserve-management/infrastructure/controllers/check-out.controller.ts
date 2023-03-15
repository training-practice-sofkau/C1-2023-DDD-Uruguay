import {
    Body,
    Controller,
    Get,
    Post,
    Put
} from "@nestjs/common";
import {
    CheckOutService,
    ConsumptionService,
    InvoiceService
} from "../persistence";
import {
    CheckOutCreatedMessagePublisher,
    ConsumptionAddedMessagePublisher,
    ConsumptionObtainedMessagePublisher,
    CostUpdatedMessagePublisher,
    ExtraUpdatedMessagePublisher,
    InvoiceAddedMessagePublisher,
    InvoiceObtainedMessagePublisher,
    MiniBarUpdatedMessagePublisher
} from "../messaging";
import {
    AddConsumptionCommand,
    AddInvoiceCommand,
    CreateCheckOutCommand,
    GetConsumptionCommand,
    GetInvoiceCommand,
    UpdateCostCommand,
    UpdateExtraCommand,
    UpdateMiniBarCommand
} from "../utils/commands";
import {
    AddConsumptionUseCase,
    AddInvoiceUseCase,
    CreateCheckOutUseCase,
    GetConsumptionUseCase,
    GetInvoiceUseCase,
    UpdateCostUseCase,
    UpdateExtraUseCase,
    UpdateMiniBarUseCase
} from "../../application/use-cases";

@Controller('check-out')
export class CheckOutController {

    constructor(
        private readonly checkOutService: CheckOutService,
        private readonly consumptionService: ConsumptionService,
        private readonly invoiceService: InvoiceService,

        private readonly checkOutCreatedMessagePublisher: CheckOutCreatedMessagePublisher,
        private readonly consumptionAddedMessagePublisher: ConsumptionAddedMessagePublisher,
        private readonly invoiceAddedMessagePublisher: InvoiceAddedMessagePublisher,
        private readonly extraUpdatedMessagePublisher: ExtraUpdatedMessagePublisher,
        private readonly miniBarUpdatedMessagePublisher: MiniBarUpdatedMessagePublisher,
        private readonly costUpdatedMessagePublisher: CostUpdatedMessagePublisher,
        private readonly consumptionObatinedMessagePublisher: ConsumptionObtainedMessagePublisher,
        private readonly invoiceObtainedMessagePublisher: InvoiceObtainedMessagePublisher,
    ) { }


    @Post('/addConsumption')
    async addConsumption(@Body() command: AddConsumptionCommand) {
        const useCase = new AddConsumptionUseCase(
            this.checkOutService,
            this.consumptionAddedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/addInvoice')
    async addInvoice(@Body() command: AddInvoiceCommand) {
        const useCase = new AddInvoiceUseCase(
            this.checkOutService,
            this.invoiceAddedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/createCheckOut')
    async createCheckOut(@Body() command: CreateCheckOutCommand) {
        const useCase = new CreateCheckOutUseCase(
            this.checkOutService,
            this.checkOutCreatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updateMiniBar')
    async updateMiniBar(@Body() command: UpdateMiniBarCommand) {
        const useCase = new UpdateMiniBarUseCase(
            this.consumptionService,
            this.miniBarUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updateExtra')
    async updateExtra(@Body() command: UpdateExtraCommand) {
        const useCase = new UpdateExtraUseCase(
            this.consumptionService,
            this.extraUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updateCost')
    async updateCost(@Body() command: UpdateCostCommand) {
        const useCase = new UpdateCostUseCase(
            this.invoiceService,
            this.costUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Get('/getConsumption')
    async getConsumption(@Body() command: GetConsumptionCommand) {
        const useCase = new GetConsumptionUseCase(
            this.consumptionService,
            this.consumptionObatinedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Get('/getInvoice')
    async getInvoice(@Body() command: GetInvoiceCommand) {
        const useCase = new GetInvoiceUseCase(
            this.invoiceService,
            this.invoiceObtainedMessagePublisher,
        );
        return await useCase.execute(command);
    }
}