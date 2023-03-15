import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { OrderAgregate } from "src/subdomains/Store/contexts/Customer-Service/domain/aggregates/order.agregate";
import { ClientDomainBase, IClientEntity } from "src/subdomains/Store/contexts/Customer-Service/domain/entities";
import { NameModifiedEventPublisher, ClientObtainedEventPublisher } from "src/subdomains/Store/contexts/Customer-Service/domain/events/publishers/order";
import { UpdateNameClient } from "src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands";
import { UpradedNameResponse } from "src/subdomains/Store/contexts/Customer-Service/domain/interfaces/responses/Order-Response";

import { ClientDomainService } from "src/subdomains/Store/contexts/Customer-Service/domain/services";
import { ClientNameValue, IdclientValue } from "src/subdomains/Store/contexts/Customer-Service/domain/value-objects";

export class UpdateNameClientCaseUse<
    Command extends UpdateNameClient = UpdateNameClient,
    Response extends UpradedNameResponse = UpradedNameResponse
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly OrderAgregate: OrderAgregate;

    constructor(
        private readonly ClientService: ClientDomainService,
        private readonly ModifiedClientEventPublisher: NameModifiedEventPublisher,
    ) {
        super();
        this.OrderAgregate = new OrderAgregate({
            ClientService,
            ModifiedClientEventPublisher
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
        const entity = this.UpdateClientNameEntity(ValueObject);
        return this.exectueOrderAggregateRoot(entity)
    }

    private createValueObject(
        command: Command
    ): IClientEntity {

        const  Name = new ClientNameValue(command.newName).value
        const ClientID = new IdclientValue(command.ClientID).value

        return {
        
          Name,
          ClientID
        }
    }

    private validateValueObject(
        valueObject: ClientDomainBase
    ): void {
        
        const {
            Name,
            ClientID
        } = valueObject
      
      
        if (ClientID instanceof IdclientValue && ClientID.hasErrors())
        this.setErrors(ClientID.getErrors());

        if (Name instanceof ClientNameValue && Name.hasErrors())
            this.setErrors(Name.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado para cambiar el nombre del cliente ',
                this.getErrors(),
            );

    }

    private UpdateClientNameEntity(
        
        valueObject: ClientDomainBase

    ): ClientDomainBase {
       
        const {
            Name,
            ClientID
        } = valueObject

        return new ClientDomainBase({          
          Name: Name,
          ClientID: ClientID
        })

    }

    private exectueOrderAggregateRoot(
        entity: ClientDomainBase,
    ): Promise<ClientDomainBase | null> {
        return this.OrderAgregate.UpdateClientName(entity)
    }
}