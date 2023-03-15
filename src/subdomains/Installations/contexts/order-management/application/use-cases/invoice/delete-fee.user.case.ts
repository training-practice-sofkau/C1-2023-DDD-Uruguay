import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { IDeleteFeeCommand } from '../../../domain/interfaces/commands';
import { IDeleteFeeResponse } from '../../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../../domain/services';

export class DeleteFeeUserCase<
              Command extends IDeleteFeeCommand = IDeleteFeeCommand,
              Response extends IDeleteFeeResponse = IDeleteFeeResponse
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
            ): Promise<boolean | null> {
              const fee = await this.invoiceAggregateRoot.deleteFee(
                command.feeId
              );
              return fee;
            }
      }
                  