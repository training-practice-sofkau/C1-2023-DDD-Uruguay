import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { CompanyDomainEntityBase } from '../../../domain/entities';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import {
  IUpdateCompanyNameCommand,
} from '../../../domain/interfaces/commands/invoice';
import {
  IUpdateCompanyNameResponse,
} from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import { CompanyNameValueObject } from '../../../domain/value-objects';

export class UpdateCompanyNameUseCase<
    Command extends IUpdateCompanyNameCommand = IUpdateCompanyNameCommand,
    Response extends IUpdateCompanyNameResponse = IUpdateCompanyNameResponse
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
    this.validateObjectValue(command.name);
    command.domain.company.name = command.name;
    return command.domain.company;
  }

  private validateObjectValue(valueObject: CompanyNameValueObject): void {
    if (
      valueObject instanceof CompanyNameValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        "Hay algunos errores en el comando ejecutado por UpdateCompanyNameUserCase",
        this.getErrors()
      );
  }
}
