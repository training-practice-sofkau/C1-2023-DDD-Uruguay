import { Body, Controller, Post } from "@nestjs/common";
import { DeviceService } from '../persistence/services';

import { DeviceAddedPublisher } from "../messaging";

import { AddDeviceUseCase } from "../../application";

import { AddDeviceCommand } from "../utils/commands";


@Controller('device')
export class DeviceController {

    constructor(
        private readonly deviceService: DeviceService,
        private readonly deviceAddedEventPublisherBase: DeviceAddedPublisher,

    ) { }


    // Get HTTP petition to creates a new Device
    @Post('/add-device')
    async createDevice(@Body() command: AddDeviceCommand) {
        const useCase = new AddDeviceUseCase(
            this.deviceService,
            this.deviceAddedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

}