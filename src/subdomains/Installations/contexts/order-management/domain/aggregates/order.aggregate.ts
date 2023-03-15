import { AggregateRootException } from '../../../../../../libs/sofka';
import { OrderDomainEntityBase } from '../entities';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
} from '../entities/order';
import {
  CreatedOrderEventPublisherBase,
  GettedOrderEventPublisherBase,
} from '../events';
import {
  OrderBenefitedCreatedEventPublisherBase,
  OrderStatusChangedEventPublisherBase,
} from '../events/publishers/order';
import {
  IBenefitedDomainService,
  IEmployedDomainService,
  IKitDomainService,
  IOrderDomainService,
} from '../services';
import { CreateOrder } from './helpers';

export class OrderAggregate implements IOrderDomainService, IEmployedDomainService, IBenefitedDomainService, IKitDomainService {
  private readonly orderService?: IOrderDomainService;
  private readonly employedService?: IEmployedDomainService;
  private readonly benefitedService?: IBenefitedDomainService;
  private readonly kitService?: IKitDomainService;
  private readonly createdOrderEventPublisherBase?: CreatedOrderEventPublisherBase;
  private readonly gettedOrderEventPublisherBase?: GettedOrderEventPublisherBase;
  private readonly orderStatusChangedEventPublisherBase?: OrderStatusChangedEventPublisherBase;

  constructor({
    orderService,
    employedService,
    benefitedService,
    kitService,
    createdOrderEventPublisherBase,
    gettedOrderEventPublisherBase,
    orderStatusChangedEventPublisherBase,
  }: {
    orderService?: IOrderDomainService;
    employedService?: IEmployedDomainService;
    benefitedService?: IBenefitedDomainService;
    kitService?: IKitDomainService;
    createdOrderEventPublisherBase?: CreatedOrderEventPublisherBase;
    gettedOrderEventPublisherBase?: GettedOrderEventPublisherBase;
    orderBenefitedCreatedEventPublisherBase?: OrderBenefitedCreatedEventPublisherBase;
    orderStatusChangedEventPublisherBase?: OrderStatusChangedEventPublisherBase;
  }) {
    this.orderService = orderService;
    this.employedService = employedService;
    this.benefitedService = benefitedService;
    this.kitService = kitService;
    this.createdOrderEventPublisherBase = createdOrderEventPublisherBase;
    this.gettedOrderEventPublisherBase = gettedOrderEventPublisherBase;
    this.orderStatusChangedEventPublisherBase =
      orderStatusChangedEventPublisherBase;
  }

  async createOrder(
    order: OrderDomainEntityBase
  ): Promise<OrderDomainEntityBase> {
    if (!this.orderService)
      throw new AggregateRootException("OrderService is not defined");
    if (!this.createdOrderEventPublisherBase)
      throw new AggregateRootException(
        "CreatedOrderEventPublisherBase is not defined"
      );

    return CreateOrder(
      order,
      this.orderService,
      this.createdOrderEventPublisherBase
    );
  }

  async getOrder(orderId: string): Promise<OrderDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GettedOrderEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GettedOrderEventPublisherBase is not defined"
      );

    return this.createdOrderEventPublisherBase.response[0];
  }

  async createBenefited(
    benefited: BenefitedDomainEntityBase
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "OrderBenefitedCreatedEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async getBenefited(benefitedId: string): Promise<BenefitedDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async deleteBenefited(benefitedId: string): Promise<boolean> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async createKit(kit: KitDomainEntityBase): Promise<KitDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "OrderKitCreatedEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async getKit(kitId: string): Promise<KitDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async deleteKit(kitId: string): Promise<boolean> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async createEmployed(
    employed: EmployedDomainEntityBase
  ): Promise<EmployedDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "OrderEmployedCreatedEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async getEmployed(employedId: string): Promise<EmployedDomainEntityBase> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async deleteEmployed(employedId: string): Promise<boolean> {
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        "GetInvoiceEventPublisherBase is not defined"
      );

    return this.gettedOrderEventPublisherBase.response[0];
  }

  async changeStatus(orderId: string): Promise<boolean> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }

  async updateEmployedName(employedId: string, newEmployedName: EmployedDomainEntityBase): Promise<EmployedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateEmployedPhone(employedId: string, newEmployedPhone: EmployedDomainEntityBase): Promise<EmployedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateBenefitedAddress(benefitedId: string, newBenefitedAddress: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateBenefitedCompanyId(benefitedId: string, newBenefitedCompanyId: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateBenefitedName(benefitedId: string, newBenefitedName: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateBenefitedPhone(benefitedId: string, newBenefitedPhone: BenefitedDomainEntityBase): Promise<BenefitedDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
  async updateKitModel(kitId: string, newKitModel: KitDomainEntityBase): Promise<KitDomainEntityBase> {
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "OrderStatusChangedEventPublisherBase is not defined"
      );

    return this.orderStatusChangedEventPublisherBase.response[0];
  }
}

//TODO