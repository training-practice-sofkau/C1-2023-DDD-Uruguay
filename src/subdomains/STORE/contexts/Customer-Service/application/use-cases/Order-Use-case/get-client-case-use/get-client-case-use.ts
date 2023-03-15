import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { OrderAgregate } from "../../../../domain/aggregates/order.agregate";
import { ClientObtainedResponse } from '../../../../domain/interfaces/responses/Order-Response/client-obtained-response';
import { ClientDomainService, IorderDomainService } from "../../../../domain/services";
import { ClientObtainedEventPublisher } from '../../../../domain/events/publishers/order/';
import { ClientDomainBase } from '../../../../domain/entities/Order-domain/client-domain-entity';
import { ClientNameValue,  PhoneValue } from "../../../../domain/value-objects";
import { IGetClient } from "../../../../domain/interfaces/commands";
import { OrderService } from '../../../../infrastructure/persitence/services/OrderServices/OrderService';

export class GetClientCaseUse<
    Command extends IGetClient = IGetClient,
    Response extends ClientObtainedResponse =  ClientObtainedResponse

>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{

    private readonly OrderAgregate: OrderAgregate;

    constructor(   

        private readonly orderService?: IorderDomainService,
        private readonly GetClientEventPublisher?: ClientObtainedEventPublisher,
    ) {
        super();
        this.OrderAgregate = new OrderAgregate({
            orderService,
            GetClientEventPublisher,
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }

    private async executeCommand(
        command: Command
    ): Promise< ClientDomainBase | null> {
        
        return this.OrderAgregate.GetClient(command.ClientID)

    }
      
}
 