import { AggregateRootException } from '../../../../../../libs/sofka';
import { InvoiceDomainEntityBase } from '../entities';
import {
  CompanyDomainEntityBase,
  FeeDomainEntityBase,
} from '../entities/invoice';
import {
  CreatedInvoiceEventPublisherBase,
  GettedInvoiceEventPublisherBase,
} from '../events/publishers';
import {
  InvoiceStatusChangedEventPublisherBase,
} from '../events/publishers/invoice';
import {
  ICompanyDomainService,
  IFeeDomainService,
  IInvoiceDomainService,
} from '../services';
import { CreateInvoice } from './helpers';

export class InvoiceAggregate implements IInvoiceDomainService, ICompanyDomainService, IFeeDomainService {
  private readonly invoiceService?: IInvoiceDomainService;
  private readonly companyService?: ICompanyDomainService;
  private readonly feeService?: IFeeDomainService;
  private readonly createdInvoiceEventPublisherBase?: CreatedInvoiceEventPublisherBase;
  private readonly gettedInvoiceEventPublisherBase?: GettedInvoiceEventPublisherBase;
  private readonly invoiceStatusChangedEventPublisherBase?: InvoiceStatusChangedEventPublisherBase;

  constructor({
    invoiceService,
    companyService,
    feeService,
    gettedInvoiceEventPublisherBase,
    createdInvoiceEventPublisherBase,
    invoiceStatusChangedEventPublisherBase,
  }: {
    invoiceService?: IInvoiceDomainService;
    companyService?: ICompanyDomainService;
    feeService?: IFeeDomainService;
    gettedInvoiceEventPublisherBase?: GettedInvoiceEventPublisherBase;
    createdInvoiceEventPublisherBase?: CreatedInvoiceEventPublisherBase;
    invoiceStatusChangedEventPublisherBase?: InvoiceStatusChangedEventPublisherBase;
  }) {
    this.invoiceService = invoiceService;
    this.companyService = companyService;
    this.feeService = feeService;
    this.gettedInvoiceEventPublisherBase = gettedInvoiceEventPublisherBase;
    this.createdInvoiceEventPublisherBase =
      createdInvoiceEventPublisherBase;
    this.invoiceStatusChangedEventPublisherBase =
      invoiceStatusChangedEventPublisherBase;
  }

  async createInvoice(
    invoice: InvoiceDomainEntityBase
  ): Promise<InvoiceDomainEntityBase> {
    if (!this.invoiceService)
      throw new AggregateRootException("InvoiceService is not defined");
    if (!this.createdInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "CreatedInvoiceEventPublisherBase is not defined"
      );

    return CreateInvoice(
      invoice,
      this.invoiceService,
      this.createdInvoiceEventPublisherBase
    );
  }

  async getInvoice(invoiceId: string): Promise<InvoiceDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async deleteInvoice(invoiceId: string): Promise<boolean> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async createCompany(
    company: CompanyDomainEntityBase
  ): Promise<CompanyDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceCompanyCreatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async getCompany(companyId: string): Promise<CompanyDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async createFee(fee: FeeDomainEntityBase): Promise<FeeDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceFeeCreatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async getFee(feeId: string): Promise<FeeDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async deleteFee(feeId: string): Promise<boolean> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "GettedInvoiceEventPublisherBase is not defined"
      );

    return this.createdInvoiceEventPublisherBase.response[0];
  }

  async updateCompanyName(
    companyId: string,
    newCompanyName: CompanyDomainEntityBase
  ): Promise<CompanyDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceCompanyNameUpdatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async updateCompanyBankAccount(
    companyId: string,
    newCompanyBankAccount: CompanyDomainEntityBase
  ): Promise<CompanyDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceCompanyBankAccountUpdatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async updateFeeCharge(
    feeId: string,
    newFee: FeeDomainEntityBase
  ): Promise<FeeDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceFeeChargeUpdatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async updateFeeTax(
    feeId: string,
    newFee: FeeDomainEntityBase
  ): Promise<FeeDomainEntityBase> {
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceFeeTaxUpdatedEventPublisherBase is not defined"
      );

    return this.gettedInvoiceEventPublisherBase.response[0];
  }

  async changeStatus(invoiceId: string): Promise<boolean> {
    if (!this.invoiceStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        "InvoiceStatusChangedEventPublisherBase is not defined"
      );

    return this.invoiceStatusChangedEventPublisherBase.response[0];
  }
}

//TODO