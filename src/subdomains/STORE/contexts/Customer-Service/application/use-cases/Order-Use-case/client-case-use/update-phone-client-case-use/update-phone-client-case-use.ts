import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { OrderAgregate } from "src/subdomains/Store/contexts/Customer-Service/domain/aggregates";
import { ClientDomainBase, IClientEntity } from "src/subdomains/Store/contexts/Customer-Service/domain/entities";
import { PhoneModifiedEventPublisher } from "src/subdomains/Store/contexts/Customer-Service/domain/events/publishers/order";
import { UpdatePhoneClient } from "src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands";
import { UpradedPhoneResponse } from "src/subdomains/Store/contexts/Customer-Service/domain/interfaces/responses/Order-Response";
import { ClientDomainService } from "src/subdomains/Store/contexts/Customer-Service/domain/services";
import { PhoneValue, IdclientValue } from "src/subdomains/Store/contexts/Customer-Service/domain/value-objects";

export class UpdatePhoneClientCaseUse<
    Command extends UpdatePhoneClient = UpdatePhoneClient,
    Response extends UpradedPhoneResponse = UpradedPhoneResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly OrderAgregate: OrderAgregate;

    constructor(
        private readonly ClientService: ClientDomainService,
        private readonly PhoneModifiedEventPublisher: PhoneModifiedEventPublisher,
    ) {
        super();
        this.OrderAgregate = new OrderAgregate({
            ClientService,
            PhoneModifiedEventPublisher
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }

    private async executeCommand(
        command: Command
    ): Promise<ClientDomainBase | null> {
        const ValueObject = this.createValueObject(command);
        this.validateValueObject(ValueObject);
        const entity = this.createEntiyUpdateName(ValueObject);
        return this.exectueOrderAggregateRoot(entity)
    }

    private createValueObject(
        command: Command
    ): IClientEntity {

        const  Phone = new PhoneValue(command.Phone).value
        const ClientID = new IdclientValue(command.ClientID).value

        return {
           Phone,
          ClientID
        }
    }

    private validateValueObject(
        valueObject: ClientDomainBase
    ): void {
        
        const {
            Phone,
            ClientID
        } = valueObject
      
      
        if (ClientID instanceof IdclientValue && ClientID.hasErrors())
        this.setErrors(ClientID.getErrors());

        if (Phone instanceof  PhoneValue &&  Phone.hasErrors())
            this.setErrors(Phone.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado para cambiar el telefono  del cliente ',
                this.getErrors(),
            );

    }

    private createEntiyUpdateName(
        
        valueObject: ClientDomainBase

    ): ClientDomainBase {
       
        const {
            Phone,
            ClientID
        } = valueObject

        return new ClientDomainBase({          
            Phone: Phone.valueOf(),
          ClientID: ClientID.valueOf()
        })

    }

    private exectueOrderAggregateRoot(
        entity: ClientDomainBase,
    ): Promise<ClientDomainBase | null> {
        return this.OrderAgregate.UpdateClientPhone(entity)
    }
}