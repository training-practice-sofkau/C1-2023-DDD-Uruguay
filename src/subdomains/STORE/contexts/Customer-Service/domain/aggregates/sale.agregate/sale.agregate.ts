import { AggregateRootException } from "src/libs";
import { BillDomain, SellerDomain, MangaDomainBase, SaleDomainEntity, ClientDomainBase } from "../../entities";
import { ClientObtainedEventPublisher, MangaObtainedEventPublisher } from "../../events/publishers/order";
import { AddedSaleEventPublisher, AddedSellerEventPublisher, BillModifiedEventPublisher, SellerModifiedEventPublisher, SalesObtainedEventPublisher, SellerNameModifiedEventPublisher, PaymentMethodEventPublisher, TotalModifiedEventPublisher, SellerObtainedEventPublisher, BillObtainedEventPublisher } from "../../events/publishers/Sale";
import { IUpdateTotal, IGetMangaData, IGetClientSale, IUpdateNameSeller, IUpdateBill } from "../../interfaces/commands";
import { BillDomainService, SellerDomainService, SaleDomainService } from "../../services";


export class SaleAgregate
  implements BillDomainService, SellerDomainService, SaleDomainService
{
  private readonly billservice: BillDomainService;
  private readonly saleservice: SaleDomainService;
  private readonly sellerService: SellerDomainService;
  private readonly AddedSaleEventPublisher: AddedSaleEventPublisher;
  private readonly AddedSellerEventPublisher: AddedSellerEventPublisher;
  private readonly ClientObtainedEventPublisher: ClientObtainedEventPublisher;
  private readonly BillModifiedEventPublisher: BillModifiedEventPublisher;
  private readonly SellerModifiedEventPublisher: SellerModifiedEventPublisher;
  private readonly SalesObtainedEventPublisher: SalesObtainedEventPublisher;
  private readonly SellerNameModifiedEventPublisher: SellerNameModifiedEventPublisher;
  private readonly MangaObtainedEventPublisher: MangaObtainedEventPublisher;
  private readonly PaymentMethodEventPublisher: PaymentMethodEventPublisher;
  private readonly TotalModifiedEventPublisher: TotalModifiedEventPublisher;
  private readonly SellerObtainedEventPublisher: SellerObtainedEventPublisher;
  private readonly BillObtainedEventPublisher: BillObtainedEventPublisher;

  constructor({
    billService,
    sellerService,
    saleService,
    AddedSaleEventPublisher,
    AddedSellerEventPublisher,
    ClientObtainedEventPublisher,
    BillModifiedEventPublisher,
    SellerModifiedEventPublisher,
    SalesObtainedEventPublisher,
    SellerNameModifiedEventPublisher,
    MangaObtainedEventPublisher,
    PaymentMethodEventPublisher,
    TotalModifiedEventPublisher,
    SellerObtainedEventPublisher,
    BillObtainedEventPublisher,
  }: {
    AddedSaleEventPublisher?: AddedSaleEventPublisher;
    AddedSellerEventPublisher?: AddedSellerEventPublisher;
    ClientObtainedEventPublisher?: ClientObtainedEventPublisher;
    BillModifiedEventPublisher?: BillModifiedEventPublisher;
    SellerModifiedEventPublisher?: SellerModifiedEventPublisher;
    SalesObtainedEventPublisher?: SalesObtainedEventPublisher;
    SellerNameModifiedEventPublisher?: SellerNameModifiedEventPublisher;
    MangaObtainedEventPublisher?: MangaObtainedEventPublisher;
    PaymentMethodEventPublisher?: PaymentMethodEventPublisher;
    TotalModifiedEventPublisher?: TotalModifiedEventPublisher;
    billService?: BillDomainService;
    sellerService?: SellerDomainService;
      saleService?: SaleDomainService;
      BillObtainedEventPublisher?: BillObtainedEventPublisher
      SellerObtainedEventPublisher?: SellerObtainedEventPublisher
  }) {
    this.AddedSaleEventPublisher = AddedSaleEventPublisher;
    this.AddedSellerEventPublisher = AddedSellerEventPublisher;
    this.ClientObtainedEventPublisher = ClientObtainedEventPublisher;
    this.BillModifiedEventPublisher = BillModifiedEventPublisher;
    this.SellerModifiedEventPublisher = SellerModifiedEventPublisher;
    this.SalesObtainedEventPublisher = SalesObtainedEventPublisher;
    this.SellerNameModifiedEventPublisher = SellerNameModifiedEventPublisher;
    this.MangaObtainedEventPublisher = MangaObtainedEventPublisher;
    this.PaymentMethodEventPublisher = PaymentMethodEventPublisher;
    this.TotalModifiedEventPublisher = TotalModifiedEventPublisher;
    this.billservice = billService;
    this.saleservice = saleService;
    this.sellerService = sellerService;
    this.SellerObtainedEventPublisher = SellerObtainedEventPublisher;
    this.BillObtainedEventPublisher = BillObtainedEventPublisher;
  }
  async GetBil(data: string): Promise<BillDomain> {
    if (this.billservice && this.BillObtainedEventPublisher) {
      const result = await this.saleservice.GetBil(data);
      this.BillObtainedEventPublisher.response = result;
      this.BillObtainedEventPublisher.publish();
      return this.BillObtainedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "billservice" y/o "BillObtainedEventPublisher" no estan definidos',
    );
  }  

  async GetSellers(data: string): Promise<SellerDomain> {
    if (this.billservice && this.SellerObtainedEventPublisher) {
      const result = await this.saleservice.GetSellers(data);
      this.SellerObtainedEventPublisher.response = result;
      this.SellerObtainedEventPublisher.publish();
      return this.SellerObtainedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "billservice" y/o "SellerObtainedEventPublisher" no estan definidos',
    );
  }

  async UpdateNameSeller(data: SellerDomain): Promise<SellerDomain> {
    if (this.billservice && this.SellerNameModifiedEventPublisher) {
      const result = await this.sellerService.UpdateNameSeller(data);
      this.SellerNameModifiedEventPublisher.response = result;
      this.SellerNameModifiedEventPublisher.publish();
      return this.SellerNameModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "sellerService" y/o "SellerNameModifiedEventPublisher" no estan definidos',
    );
  }

  async UpdatePaymentMethod(data: BillDomain): Promise<BillDomain> {
    if (this.billservice && this.PaymentMethodEventPublisher) {
      const result = await this.billservice.UpdatePaymentMethod(data);
      this.PaymentMethodEventPublisher.response = result;
      this.PaymentMethodEventPublisher.publish();
      return this.PaymentMethodEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "billservice" y/o "PaymentMethodEventPublisher" no estan definidos',
    );
  }

  async UpdateTotal(data: BillDomain): Promise<BillDomain> {
    if (this.billservice && this.TotalModifiedEventPublisher) {
      const result = await this.billservice.UpdateTotal(data);
      this.TotalModifiedEventPublisher.response = result;
      this.TotalModifiedEventPublisher.publish();
      return this.TotalModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "billservice" y/o "TotalModifiedEventPublisher" no estan definidos',
    );
  }

  async getMangaData(idManga: string): Promise<MangaDomainBase> {
    if (this.billservice && this.MangaObtainedEventPublisher) {
      const result = await this.billservice.getMangaData(idManga);
      this.MangaObtainedEventPublisher.response = result;
      this.MangaObtainedEventPublisher.publish();
      return this.MangaObtainedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "billservice" y/o "MangaObtainedEventPublisher" no estan definidos',
    );
  }

  async RegisterSale(sale: SaleDomainEntity): Promise<SaleDomainEntity> {
    if (this.billservice && this.AddedSaleEventPublisher) {
      const result = await this.saleservice.RegisterSale(sale);
      this.AddedSaleEventPublisher.response = result;
      this.AddedSaleEventPublisher.publish();
      return this.AddedSaleEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "saleservice" y/o "AddedSaleEventPublisher" no estan definidos',
    );
  }

  async GetClient(ClientId: string): Promise<ClientDomainBase> {
    if (this.billservice && this.ClientObtainedEventPublisher) {
      const result = await this.saleservice.GetClient(ClientId);
      this.ClientObtainedEventPublisher.response = result;
      this.ClientObtainedEventPublisher.publish();
      return this.ClientObtainedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "saleservice" y/o "ClientObtainedEventPublisher" no estan definidos',
    );
  }

  async GetSalesList(data: string  ): Promise<SaleDomainEntity> {
    if (this.billservice && this.SalesObtainedEventPublisher) {
      const result = await this.saleservice.GetSalesList(data );
      this.SalesObtainedEventPublisher.response = result;
      this.SalesObtainedEventPublisher.publish();
      return this.SalesObtainedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "saleservice" y/o "SalesObtainedEventPublisher" no estan definidos',
    );
  }

  async AddSeller(sellerID: SellerDomain): Promise<SellerDomain> {
    if (this.saleservice && this.AddedSellerEventPublisher) {
      const result = await this.saleservice.AddSeller(sellerID);
      this.AddedSellerEventPublisher.response = result;
      this.AddedSellerEventPublisher.publish();
      return this.AddedSellerEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "saleservice" y/o "AddedSellerEventPublisher" no estan definidos',
    );
  }

  async UpdateSeller(data: SellerDomain): Promise<SellerDomain> {
    if (this.billservice && this.SellerModifiedEventPublisher) {
      const result = await this.saleservice.UpdateSeller(data);
      this.SellerModifiedEventPublisher.response = result;
      this.SellerModifiedEventPublisher.publish();
      return this.SellerModifiedEventPublisher.response;
    }
    throw new AggregateRootException(
      'SaleAgregate "saleservice" y/o "SellerModifiedEventPublisher" no estan definidos',
    );
  }

  /**
   * It updates a bill.
   * @param {string} BillId - The id of the bill to be updated.
   * @param {BillDomain} data - The data to be updated.
   * @returns The BillDomain object
   */

}
