import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { OrderAgregate } from "../../../../domain/aggregates/order.agregate";
import { ClientDomainService, SaleDomainService } from "../../../../domain/services";
import { ClientAddEventPublisher } from '../../../../domain/events/publishers/order/added-customer-event-Publisher';
import { ClientDomainBase, IClientEntity, SellerDomain } from "../../../../domain/entities";
import { IdclientValue } from '../../../../domain/value-objects/Sale/Bill/idclient-value/idclient-value';
import { ClientNameValue, IdsellerValue } from "../../../../domain/value-objects";
import { PhoneValue } from '../../../../domain/value-objects/Order/Client/phone-value/phone-value';
import { AddedSellerEventPublisher } from '../../../../domain/events/publishers/Sale/added-seller-event-publisher';
import { SaleAgregate } from "../../../../domain/aggregates/sale.agregate";
import { NameSellerValue } from '../../../../domain/value-objects/Sale/Seller/name-value/name-value';
import { IAddSaller } from "../../../../domain/interfaces/commands";

export class AddSallerUseCase<
    Command extends IAddSaller = IAddSaller,
    Response extends AddedSellerEventPublisher = AddedSellerEventPublisher
>
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
{
    private readonly SaleAgregate: SaleAgregate;

    constructor(
        private readonly saleService: SaleDomainService,
        private readonly AddedSellerEventPublisher: AddedSellerEventPublisher,
    ) {
        super();
        this.SaleAgregate = new SaleAgregate({
            saleService,
            AddedSellerEventPublisher
        })
    }

    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }

    private async executeCommand(
        command: Command
    ): Promise<SellerDomain | null> {
        const ValueObject = this.createValueObject(command);
        const entity = this.createEntityAddSeller(ValueObject);
        return this.exectueSaleAggregateRoot(entity)
    }

    private createValueObject(
        command: Command
    ): SellerDomain {

        const IdSeller   = new IdsellerValue(command.IdSeller)
        const  Name = new NameSellerValue(command.Name)

        return {
           
            IdSeller,
            Name,

        }
    }

 

    private createEntityAddSeller(
        valueObject: SellerDomain
    ): SellerDomain {

        const {
            Name,
            IdSeller
        } = valueObject

        return new SellerDomain({
          
          Name: Name,
          IdSeller: IdSeller,
        })
    }

    private exectueSaleAggregateRoot(
        entity: SellerDomain,
    ): Promise<SellerDomain | null> {
        return this.SaleAgregate.AddSeller(entity)
    }
}