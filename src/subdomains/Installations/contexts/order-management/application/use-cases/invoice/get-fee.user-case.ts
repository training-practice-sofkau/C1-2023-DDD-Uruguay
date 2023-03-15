import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces/';
import { FeeDomainEntityBase } from '../../../domain/entities/invoice';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { IGetFeeCommand } from '../../../domain/interfaces/commands';
import { IGetFeeResponse } from '../../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../../domain/services';
import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects/invoice';

export class GetFeeUserCase<
        Command extends IGetFeeCommand = IGetFeeCommand,
        Response extends IGetFeeResponse = IGetFeeResponse
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
        const fee = await this.invoiceAggregateRoot.getFee(
          command.feeId
        );
        this.validateEntity(fee);
        return fee;
      }
    
      private validateEntity(fee: IFeeDomainEntity): void {
        const { feeId, charge, tax } = fee;
    
        if (feeId instanceof FeeIdValueObject && feeId.hasErrors())
          this.setErrors(feeId.getErrors());
  
        if (charge instanceof FeeChargeValueObject && charge.hasErrors())
          this.setErrors(charge.getErrors());
        
        if (tax instanceof FeeTaxValueObject && tax.hasErrors())
          this.setErrors(tax.getErrors());
    
        if (this.hasErrors() === true)
          throw new ValueObjectException(
            "Hay algunos errores en el comando ejecutado por GetFee",
            this.getErrors()
          );
      }
  
  }
    