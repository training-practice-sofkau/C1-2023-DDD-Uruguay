import { AggregateRootException } from 'src/libs';

import {
  OrderDomainEntityBase,
  ClientDomainBase,
  MangaDomainBase,
} from '../../entities';
import { ClientAddEventPublisher, ClientModifiedEventPublisher, ClientObtainedEventPublisher, DeleteOrderEventPublisher, MangaModifiedEventPublisher, MangaObtainedEventPublisher, NameMangaModifiedEventPublisher, NameModifiedEventPublisher, OrderAddEventPublisher, OrderModifiedEventPublisher, PhoneModifiedEventPublisher, PrinceModifiedEventPublisher, StateModifiedEventPublisher } from '../../events/publishers/order';
import { IUpdateOrder, IDeleteOrder, IUpdateMangaStock, IUpdateClient, UpdateStateManga, UpdatePriceManga } from '../../interfaces/commands';



import {
  IorderDomainService,
  ClientDomainService,
  MangaDomainService,
} from '../../services';

export class OrderAgregate
  implements IorderDomainService, ClientDomainService, MangaDomainService
{
  /* 
 In this place go the services

*/
  /* A way to define the services that will be used in the aggregate. */
  private readonly orderService?: IorderDomainService;
  private readonly MangaService?: MangaDomainService;
  private readonly ClientService?: ClientDomainService;

  /* 
Publisher events go in this place
*/
  /* A way to define the events that will be used in the aggregate. */
  private readonly RegisterOrderEventPublisher: OrderAddEventPublisher;
  private readonly AddCustomerEventPublisher: ClientAddEventPublisher;
  private readonly GetClientEventPublisher: ClientObtainedEventPublisher;
  private readonly DeleteOrderEventPublisher: DeleteOrderEventPublisher;
  private readonly GetMangaEventPublisher: MangaObtainedEventPublisher;
  private readonly ModifiedClientEventPublisher: ClientModifiedEventPublisher;
  private readonly ModifiedMangaStockingEventPublisher: MangaModifiedEventPublisher;
  private readonly ModifiedOrderEventPublisher: OrderModifiedEventPublisher;
  private readonly NameMangaModifiedEventPublisher: NameMangaModifiedEventPublisher;
  private readonly PrinceModifiedEventPublisher: PrinceModifiedEventPublisher;
  private readonly StateModifiedEventPublisher: StateModifiedEventPublisher;
  private readonly NameModifiedEventPublisher: NameModifiedEventPublisher;
  private readonly PhoneModifiedEventPublisher: PhoneModifiedEventPublisher;

  /**
   * A constructor function that takes in an object as a parameter.
   * @param  -
   */
  constructor({
    orderService,
    RegisterOrderEventPublisher,
    MangaService,
    ClientService,
    AddCustomerEventPublisher,
    GetClientEventPublisher,
    DeleteOrderEventPublisher,
    GetMangaEventPublisher,
    ModifiedClientEventPublisher,
    ModifiedMangaStockingEventPublisher,
    ModifiedOrderEventPublisher,
    NameMangaModifiedEventPublisher,
    PrinceModifiedEventPublisher,
    StateModifiedEventPublisher,
    NameModifiedEventPublisher,
    PhoneModifiedEventPublisher,
  }: {
    NameModifiedEventPublisher?: NameModifiedEventPublisher;
    PhoneModifiedEventPublisher?: PhoneModifiedEventPublisher;
    NameMangaModifiedEventPublisher?: NameMangaModifiedEventPublisher;
    PrinceModifiedEventPublisher?: PrinceModifiedEventPublisher;
    StateModifiedEventPublisher?: StateModifiedEventPublisher;
    AddCustomerEventPublisher?: ClientAddEventPublisher;
    GetClientEventPublisher?: ClientObtainedEventPublisher;
    DeleteOrderEventPublisher?: DeleteOrderEventPublisher;
    GetMangaEventPublisher?: MangaObtainedEventPublisher;
    ModifiedClientEventPublisher?: ClientModifiedEventPublisher;
    ModifiedMangaStockingEventPublisher?: MangaModifiedEventPublisher;
    ModifiedOrderEventPublisher?: OrderModifiedEventPublisher;
    MangaService?: MangaDomainService;
    orderService?: IorderDomainService;
    ClientService?: ClientDomainService;
    RegisterOrderEventPublisher?: OrderAddEventPublisher;
  }) {
    this.NameModifiedEventPublisher = NameModifiedEventPublisher;
    this.PhoneModifiedEventPublisher = PhoneModifiedEventPublisher;
    this.NameMangaModifiedEventPublisher = NameMangaModifiedEventPublisher;
    this.PrinceModifiedEventPublisher = PrinceModifiedEventPublisher;
    this.StateModifiedEventPublisher = StateModifiedEventPublisher;
    this.AddCustomerEventPublisher = AddCustomerEventPublisher;
    this.GetClientEventPublisher = GetClientEventPublisher;
    this.GetMangaEventPublisher = GetMangaEventPublisher;
    this.ModifiedClientEventPublisher = ModifiedClientEventPublisher;
    this.ModifiedMangaStockingEventPublisher =
      ModifiedMangaStockingEventPublisher;
    this.ModifiedOrderEventPublisher = ModifiedOrderEventPublisher;
    this.DeleteOrderEventPublisher = DeleteOrderEventPublisher;
    this.ClientService = ClientService;
    this.MangaService = MangaService;
    this.orderService = orderService;
    this.RegisterOrderEventPublisher = RegisterOrderEventPublisher;
  }

  /**
   * A function that is called when the RegisterOrder command is received.
   * @param {OrderDomainEntityBase} order - OrderDomainEntityBase: The order to be registered.
   * @returns The response of the event publisher
   */
  async RegisterOrder(order: OrderDomainEntityBase): Promise<OrderDomainEntityBase> {
    if (this.orderService && this.RegisterOrderEventPublisher) {
      const result = await this.orderService.RegisterOrder(order);
      this.RegisterOrderEventPublisher.response = result;
      this.RegisterOrderEventPublisher.publish();
      return this.RegisterOrderEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "RegisterOrderEventPublisher" no estan definidos',
    );
  }
  /**
   * The function GetClient is an async function that returns a Promise of type ClientDomainBase
   * @param {string} ClientId - string
   * @returns The result of the GetClient method of the OrderService
   */
  async GetClient(data: string): Promise<ClientDomainBase> {
    if (this.orderService && this.GetClientEventPublisher) {
      
      const result = await this.orderService.GetClient(data);

      this.GetClientEventPublisher.response = result

      this.GetClientEventPublisher.publish();

      return this.GetClientEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "GetClientEventPublisher" no estan definidos',
    );
  }

  /**
   * It updates an order.
   * @param {string} OrderId - The order id to be updated.
   * @returns The OrderDomainEntityBase
   */


  /**
   * The function Delete() is an async function that takes an OrderId as a parameter and returns a
   * Promise of type OrderDomainEntityBase
   * @param {string} OrderId - The id of the order to be deleted.
   * @returns The OrderDomainEntityBase
   */

  async Delete(data: string): Promise<OrderDomainEntityBase> {
    if (this.orderService && this.DeleteOrderEventPublisher) {
      const result = await this.orderService.Delete(data);

      this.DeleteOrderEventPublisher.response = result;

      this.DeleteOrderEventPublisher.publish();

      return this.DeleteOrderEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "DeleteOrderEventPublisher" no estan definidos',
    );
  }

  /**
   * It gets a manga by its id.
   * @param {string} MangaId - The id of the manga to be retrieved.
   * @returns The result of the GetManga method of the OrderService
   */

  async GetManga(data: string): Promise<MangaDomainBase> {
    if (this.orderService && this.GetMangaEventPublisher) {
      const result = await this.orderService.GetManga(data);

      this.GetMangaEventPublisher.response = result;

      this.GetMangaEventPublisher.publish();

      return this.GetMangaEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "GetMangaEventPublisher" no estan definidos',
    );
  }

  /**
   * It adds a client to the database.
   * @param {string} MangaId - The id of the manga you want to add a client to.
   */
  async AddClient(data: ClientDomainBase): Promise<ClientDomainBase> {
    if (this.orderService && this.AddCustomerEventPublisher) {

      const result = await this.orderService.AddClient(data);

      this.AddCustomerEventPublisher.response = result;

      this.AddCustomerEventPublisher.publish();

      return this.AddCustomerEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "AddCustomerEventPublisher" no estan definidos',
    );
  }

  /**
   * It updates the stock of a manga.
   * @param {string} MangaId - The id of the manga you want to update.
   */
  async UpdateMangaStock(data: MangaDomainBase): Promise<MangaDomainBase> {
    if (this.orderService && this.ModifiedMangaStockingEventPublisher) {
      const result = await this.orderService.UpdateMangaStock(data);

      this.ModifiedMangaStockingEventPublisher.response = result;

      this.ModifiedMangaStockingEventPublisher.publish();

      return this.ModifiedMangaStockingEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "ModifiedMangaStockingEventPublisher" no estan definidos',
    );
  }

  /**
  /*
   * Methods for the manga entity
   *
   */
  /**
   * It updates the name of the manga.
   * @param {string} name - The name of the manga.
   */
  async UpdateName(idClient: MangaDomainBase): Promise<MangaDomainBase> {
    if (this.orderService && this.NameMangaModifiedEventPublisher) {
      const result = await this.MangaService.UpdateName(idClient);

      this.NameMangaModifiedEventPublisher.response = result;

      this.NameMangaModifiedEventPublisher.publish();

      return this.NameMangaModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "NameMangaModifiedEventPublisher" no estan definidos',
    );
  }
  /**
   * It updates the state of the manga.
   * @param {number} state - The state of the manga.
   */
  async UpdateState(idmanga: MangaDomainBase): Promise<MangaDomainBase> {
    if (this.orderService && this.StateModifiedEventPublisher) {
      const result = await this.MangaService.UpdateState(idmanga);

      this.StateModifiedEventPublisher.response = result;

      this.StateModifiedEventPublisher.publish();

      return this.StateModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "StateModifiedEventPublisher" no estan definidos',
    );
  }

  /**
   * It updates the price of the manga.
   * @param {number} Price - number - The price of the manga.
   */
  async UpdatePrice(idmanga: MangaDomainBase): Promise<MangaDomainBase> {
    if (this.orderService && this.PrinceModifiedEventPublisher) {
      const result = await this.MangaService.UpdatePrice(idmanga);

      this.PrinceModifiedEventPublisher.response = result;

      this.PrinceModifiedEventPublisher.publish();

      return this.PrinceModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "OrderService" y/o "PrinceModifiedEventPublisher" no estan definidos',
    );
  }

  /**
   * The function UpdateClientName is an asynchronous function that receives an object of type
   * UpdateNameClient as a parameter and returns an object of type ClientDomainBase
   * @param {UpdateNameClient} idclient - UpdateNameClient
   * @returns The result of the update of the client name
   */
  async UpdateClientName(    idclient: ClientDomainBase,  ): Promise<ClientDomainBase> {
    if(this.NameModifiedEventPublisher) 
    throw new AggregateRootException(
      'aca esta tu error',
    );
    if (this.ClientService && this.NameModifiedEventPublisher) {
      const result = await this.ClientService.UpdateClientName(idclient);

      this.NameModifiedEventPublisher.response = result;

      this.NameModifiedEventPublisher.publish();

      return this.NameModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'OrderAgregate "ClientService" y/o "NameModifiedEventPublisher" no estan definidos',
    );
  }

  /* The above code is a sample of a domain event handler. */
  async UpdateClientPhone(
    idclient: ClientDomainBase,
  ): Promise<ClientDomainBase> {
    if (this.ClientService && this.PhoneModifiedEventPublisher) {
      const result = await this.ClientService.UpdateClientPhone(idclient);

      this.PhoneModifiedEventPublisher.response = result;

      this.PhoneModifiedEventPublisher.publish();

      return this.PhoneModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'ClientService "ClientService" y/o "PhoneModifiedEventPublisher" no estan definidos',
    );
  }
}
