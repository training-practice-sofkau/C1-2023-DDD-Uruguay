import {
    Body,
    Controller,
    Get,
    Post,
    Put
} from "@nestjs/common";
import {
    CheckInService,
    GuestService,
    RoomKeyService
} from "../persistence";
import {
    AccessLevelUpdatedMessagePublisher,
    CheckInCreatedMessagePublisher,
    EmailUpdatedMessagePublisher,
    GuestAddedMessagePublisher,
    GuestObtainedMessagePublisher,
    PhoneUpdatedMessagePublisher,
    RoomKeyAddedMessagePublisher,
    RoomKeyObtainedMessagePublisher
} from "../messaging";
import {
    AddGuestCommand,
    AddRoomKeyCommand,
    CreateCheckInCommand,
    GetGuestCommand,
    GetRoomKeyCommand,
    UpdateAccessLevelCommand,
    UpdateEmailCommand,
    UpdatePhoneCommand
} from "../utils/commands";
import {
    AddGuestUseCase,
    AddRoomKeyUseCase,
    CreateCheckInUseCase,
    GetGuestUseCase,
    GetRoomKeyUseCase,
    UpdateAccessLevelUseCase,
    UpdateEmailUseCase,
    UpdatePhoneUseCase
} from "../../application/use-cases";

@Controller('check-in')
export class CheckInController {

    constructor(
        private readonly checkInService: CheckInService,
        private readonly guestService: GuestService,
        private readonly roomKeyService: RoomKeyService,

        private readonly checkInCreatedMessagePublisher: CheckInCreatedMessagePublisher,
        private readonly guestAddedMessagePublisher: GuestAddedMessagePublisher,
        private readonly roomKeyAddedMessagePublisher: RoomKeyAddedMessagePublisher,
        private readonly emailUpdatedMessagePublisher: EmailUpdatedMessagePublisher,
        private readonly phoneUpdatedMessagePublisher: PhoneUpdatedMessagePublisher,
        private readonly accessLevelUpdatedMessagePublisher: AccessLevelUpdatedMessagePublisher,
        private readonly guestObatinedMessagePublisher: GuestObtainedMessagePublisher,
        private readonly roomKeyObtainedMessagePublisher: RoomKeyObtainedMessagePublisher,
    ) { }


    @Post('/addGuest')
    async addGuest(@Body() command: AddGuestCommand) {
        const useCase = new AddGuestUseCase(
            this.checkInService,
            this.guestAddedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/addRoomKey')
    async addRoomKey(@Body() command: AddRoomKeyCommand) {
        const useCase = new AddRoomKeyUseCase(
            this.checkInService,
            this.roomKeyAddedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/createCheckIn')
    async createCheckIn(@Body() command: CreateCheckInCommand) {
        const useCase = new CreateCheckInUseCase(
            this.checkInService,
            this.checkInCreatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updatePhone')
    async updatePhone(@Body() command: UpdatePhoneCommand) {
        const useCase = new UpdatePhoneUseCase(
            this.checkInService,
            this.phoneUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updateEmail')
    async updateEmail(@Body() command: UpdateEmailCommand) {
        const useCase = new UpdateEmailUseCase(
            this.checkInService,
            this.emailUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Put('/updateAccessLevel')
    async updateAccessLevel(@Body() command: UpdateAccessLevelCommand) {
        const useCase = new UpdateAccessLevelUseCase(
            this.roomKeyService,
            this.accessLevelUpdatedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Get('/getGuest')
    async getGuest(@Body() command: GetGuestCommand) {
        const useCase = new GetGuestUseCase(
            this.guestService,
            this.guestObatinedMessagePublisher,
        );
        return await useCase.execute(command);
    }

    @Get('/getRoomKey')
    async getRoomKey(@Body() command: GetRoomKeyCommand) {
        const useCase = new GetRoomKeyUseCase(
            this.roomKeyService,
            this.roomKeyObtainedMessagePublisher,
        );
        return await useCase.execute(command);
    }
}