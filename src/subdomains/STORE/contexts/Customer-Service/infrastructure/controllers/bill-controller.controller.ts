import { IPaymentMethodEventPublisher } from './../messaging/publisher/Sale/Bill/Payment-method-messaging-publisher';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { GetBillUseCase,  UpdatePaymentUseCase, UpdateTotalUseCase } from '../../application';
import { IupdatePaymentMethod } from '../utils/commands/sale/IupdatePaymentMethod';
import { BillService } from '../persitence/services/SaleServices/BillService';
import { SaleService } from '../persitence/services/SaleServices/SaleService';
import { IBillObtainedEventPublisher } from '../messaging/publisher/Sale/IBillObtainedEventPublisher';
import { IGetBill } from '../utils/commands/sale/IGetBill';
import { IupdateTotalcommand } from '../utils/commands/sale/IupdateTotal';
import { ITotalModifiedEventPublisher } from '../messaging/publisher/Sale/Bill/total-modified--messaging-publisher';

@Controller('Bill')
export class BillControllerController {


    constructor(
        private readonly BillService: BillService,
        private readonly SaleService: SaleService,
        private readonly IBillObtainedEventPublisher:IBillObtainedEventPublisher,
        private readonly ITotalModifiedEventPublisher:ITotalModifiedEventPublisher,
        private readonly IPaymentMethodEventPublisher:IPaymentMethodEventPublisher

    
    
      ) {}


    @Get()
    getBill(@Body() command: IGetBill) {
      const useCase = new  GetBillUseCase (this.SaleService,  this.IBillObtainedEventPublisher)
      return useCase.execute(command)
      
    }

    @Put('Bill-total')
    updateBillTotal(@Body() command: IupdateTotalcommand) {
      const useCase = new UpdateTotalUseCase(
        this.BillService,
        this.ITotalModifiedEventPublisher,
      );
      useCase.execute(command);
    }
  
    @Put('Bill-Payment-Method')
    updateBillPyment(@Body() command: IupdatePaymentMethod) {
      const useCase = new UpdatePaymentUseCase(
        this.BillService,
        this.IPaymentMethodEventPublisher,
      );
      useCase.execute(command);
    }
  


}
