import {
    IUseCase,
    ValueObjectErrorHandler,
    ValueObjectException
} from "src/libs/sofka";
import {
    CheckOutAggregate,
    CheckOutCreatedEventPublisher,
    CheckOutDomainEntity,
    ConsumptionObtainedEventPublisher,
    DateValueObject,
    FullNameValueObject,
    ICheckOutCreatedResponse,
    ICheckOutDomainEntity,
    ICheckOutDomainService,
    ICreateCheckOut,
    InvoiceObtainedEventPublisher
} from "../../../../domain";
import {
    GetConsumptionUseCase,
    GetInvoiceUseCase
} from "..";

export class CreateCheckOutUseCase<
    Command extends ICreateCheckOut = ICreateCheckOut,
    Response extends ICheckOutCreatedResponse = ICheckOutCreatedResponse
> extends ValueObjectErrorHandler implements IUseCase<Command, Response>
{
    private readonly checkOutAggregate: CheckOutAggregate;
    private readonly getConsumptionUseCase: GetConsumptionUseCase;
    private readonly getInvoiceUseCase: GetInvoiceUseCase;

    constructor(
        private readonly checkOutService: ICheckOutDomainService,
        private readonly checkOutCreatedEventPublisher: CheckOutCreatedEventPublisher,
    ) {
        super();
        this.checkOutAggregate = new CheckOutAggregate({
            checkOutService,
            checkOutCreatedEventPublisher
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }


    private async executeCommand(command: Command): Promise<CheckOutDomainEntity | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);
        const checkOut = this.createEntityCheckOutDomain(ValueObject, command);
        return this.exectueCheckOutAggregate(await checkOut)
    }

    private createValueObject(command: Command): ICheckOutDomainEntity {
        const recepsionistName = new FullNameValueObject(command.recepsionistName);
        const endDate = new DateValueObject(command.endDate);

        return {
            recepsionistName,
            endDate
        }
    }

    private validateValueObject(valueObject: ICheckOutDomainEntity): void {
        const {
            recepsionistName,
            endDate
        } = valueObject

        if (recepsionistName instanceof FullNameValueObject && recepsionistName.hasErrors())
            this.setErrors(recepsionistName.getErrors());

        if (endDate instanceof DateValueObject && endDate.hasErrors())
            this.setErrors(endDate.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado por CreateCheckOutUseCase',
                this.getErrors(),
            );
    }

    private async createEntityCheckOutDomain(valueObject: ICheckOutDomainEntity, command: Command): Promise<CheckOutDomainEntity> {
        const {
            recepsionistName,
            endDate
        } = valueObject

        const responseConsumption = this.getConsumptionUseCase.execute({ consumptionId: command.consumptionId })

        const responseInvoice = this.getInvoiceUseCase.execute({ invoiceId: command.invoiceId })

        return new CheckOutDomainEntity({
            recepsionistName: recepsionistName.valueOf(),
            endDate: endDate,
            consumption: (await responseConsumption).data,
            invoice: (await responseInvoice).data,
        })
    }

    private exectueCheckOutAggregate(checkOut: CheckOutDomainEntity): Promise<CheckOutDomainEntity | null> {
        return this.checkOutAggregate.createCheckOut(checkOut)
    }
}
