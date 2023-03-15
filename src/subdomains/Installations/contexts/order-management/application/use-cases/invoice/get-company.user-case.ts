import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { ICompanyDomainEntity } from '../../../domain/entities/interfaces/';
import { CompanyDomainEntityBase } from '../../../domain/entities/invoice';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { IGetCompanyCommand } from '../../../domain/interfaces/commands';
import { IGetCompanyResponse } from '../../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../../domain/services';
import {
  CompanyBankAccountValueObject,
  CompanyIdValueObject,
  CompanyNameValueObject,
} from '../../../domain/value-objects/invoice';

export class GetCompanyUserCase<
      Command extends IGetCompanyCommand = IGetCompanyCommand,
      Response extends IGetCompanyResponse = IGetCompanyResponse
    >
    extends ValueObjectErrorHandler
    implements IUseCase<Command, Response>
  {

    private readonly invoiceAggregateRoot: InvoiceAggregate;

    constructor(
      private readonly invoiceService: IInvoiceDomainService,
      private readonly createdInvoiceEventPublisherBase: CreatedInvoiceEventPublisherBase
    ) {
      super();
      this.invoiceAggregateRoot = new InvoiceAggregate({
        invoiceService,
        createdInvoiceEventPublisherBase,
      });
    }
  
    async execute(command?: Command): Promise<Response> {
      const data = await this.executeCommand(command);
  
      return { success: data ? true : false, data } as unknown as Response;
    }
  
    private async executeCommand(
      command: Command
    ): Promise<CompanyDomainEntityBase | null> {
      const company = await this.invoiceAggregateRoot.getCompany(
        command.companyId
      );
      this.validateEntity(company);
      return company;
    }
  
    private validateEntity(company: ICompanyDomainEntity): void {
      const { companyId, name, bankAccount } = company;
  
      if (companyId instanceof CompanyIdValueObject && companyId.hasErrors())
        this.setErrors(companyId.getErrors());
  
      if (name instanceof CompanyNameValueObject && name.hasErrors())
        this.setErrors(name.getErrors());

      if (bankAccount instanceof CompanyBankAccountValueObject && bankAccount.hasErrors())
        this.setErrors(bankAccount.getErrors());
  
      if (this.hasErrors() === true)
        throw new ValueObjectException(
          "Hay algunos errores en el comando ejecutado por GetCompany",
          this.getErrors()
        );
    }

}
  