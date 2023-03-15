import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { FeeDomainEntityBase } from '../../../domain/entities';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { ICreateFeeCommand } from '../../../domain/interfaces/commands/invoice';
import {
  ICreateFeeResponse,
} from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import {
  FeeChargeValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects';

export class CreateFeeUseCase<
    Command extends ICreateFeeCommand = ICreateFeeCommand,
    Response extends ICreateFeeResponse = ICreateFeeResponse
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
  ): Promise<FeeDomainEntityBase | null> {
    const ValueObject = this.createValueObject(command);
    this.validateValueObject(ValueObject);
    const entity = this.createEntityFeeDomain(ValueObject);
    return this.executeInvoiceAggregateRoot(entity);
  }

  private createValueObject(command: Command): IFeeDomainEntity {
    const charge = new FeeChargeValueObject(command.charge);
    const tax = new FeeTaxValueObject(command.tax);

    return {
      charge,
      tax,
    };
  }

  private validateValueObject(valueObject: IFeeDomainEntity): void {
    const { charge, tax } = valueObject;

    if (charge instanceof FeeChargeValueObject && charge.hasErrors())
      this.setErrors(charge.getErrors());

    if (tax instanceof FeeTaxValueObject && tax.hasErrors())
      this.setErrors(tax.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        "Hay algunos errores en el comando ejecutado por createFeeUserCase",
        this.getErrors()
      );
  }

  private createEntityFeeDomain(
    valueObject: IFeeDomainEntity
  ): FeeDomainEntityBase {
    const { charge, tax } = valueObject;

    return new FeeDomainEntityBase({
      charge: charge.valueOf(),
      tax: tax.valueOf(),
    });
  }

  private executeInvoiceAggregateRoot(
    entity: FeeDomainEntityBase
  ): Promise<FeeDomainEntityBase | null> {
    return this.invoiceAggregateRoot.createFee(entity);
  }
}
