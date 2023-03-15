import {
    IUseCase,
    ValueObjectErrorHandler,
    ValueObjectException
} from "src/libs/sofka";
import {
    CheckInAggregate,
    CheckInCreatedEventPublisher,
    CheckInDomainEntity,
    DateValueObject,
    FullNameValueObject,
    GuestObtainedEventPublisher,
    ICheckInCreatedResponse,
    ICheckInDomainEntity,
    ICheckInDomainService,
    ICreateCheckIn,
    RoomKeyObtainedEventPublisher
} from "../../../../domain";
import {
    GetGuestUseCase,
    GetRoomKeyUseCase
} from "..";

export class CreateCheckInUseCase<
    Command extends ICreateCheckIn = ICreateCheckIn,
    Response extends ICheckInCreatedResponse = ICheckInCreatedResponse
> extends ValueObjectErrorHandler implements IUseCase<Command, Response>
{
    private readonly checkInAggregate: CheckInAggregate;
    private readonly getGuestUseCase: GetGuestUseCase;
    private readonly getRoomKeyUseCase: GetRoomKeyUseCase;

    constructor(
        private readonly checkInService: ICheckInDomainService,
        private readonly checkInCreatedEventPublisher: CheckInCreatedEventPublisher,
    ) {
        super();
        this.checkInAggregate = new CheckInAggregate({
            checkInService,
            checkInCreatedEventPublisher
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }


    private async executeCommand(command: Command): Promise<CheckInDomainEntity | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);
        const checkIn = this.createEntityCheckInDomain(ValueObject, command);
        return this.exectueCheckInAggregate(await checkIn)
    }

    private createValueObject(command: Command): ICheckInDomainEntity {
        const recepsionistName = new FullNameValueObject(command.recepsionistName);
        const startDate = new DateValueObject(command.startDate);

        return {
            recepsionistName,
            startDate
        }
    }

    private validateValueObject(valueObject: ICheckInDomainEntity): void {
        const {
            recepsionistName,
            startDate
        } = valueObject

        if (recepsionistName instanceof FullNameValueObject && recepsionistName.hasErrors())
            this.setErrors(recepsionistName.getErrors());

        if (startDate instanceof DateValueObject && startDate.hasErrors())
            this.setErrors(startDate.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado por CreateCheckInUseCase',
                this.getErrors(),
            );
    }

    private async createEntityCheckInDomain(valueObject: ICheckInDomainEntity, command: Command): Promise<CheckInDomainEntity> {
        const {
            recepsionistName,
            startDate
        } = valueObject

        const responseGuest = this.getGuestUseCase.execute({ guestId: command.guestId })

        const responseRoomKey = this.getRoomKeyUseCase.execute({ roomKeyId: command.roomKeyId })

        return new CheckInDomainEntity({
            recepsionistName: recepsionistName.valueOf(),
            startDate: startDate,
            guest: (await responseGuest).data,
            roomKey: (await responseRoomKey).data,
        })
    }

    private exectueCheckInAggregate(checkIn: CheckInDomainEntity): Promise<CheckInDomainEntity | null> {
        return this.checkInAggregate.createCheckIn(checkIn)
    }
}

