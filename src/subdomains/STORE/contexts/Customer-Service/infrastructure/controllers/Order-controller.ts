import { Controller, Post, Body } from '@nestjs/common';
import { RegisterOrderCaseUse} from '../../application';
import {
  IOrderAddEventPublisher,
} from '../messaging/publisher/order';
import {  OrderService } from '../persitence';
import { IRegisterOrderCommand } from '../utils/commands/order/Iregister-order-comand';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,

    private readonly registerOrderEventPublisher: IOrderAddEventPublisher,
    
  ) {}

  @Post('create-order')
  async orderRegister(@Body() command: IRegisterOrderCommand) {
    const useCase = new RegisterOrderCaseUse(
      this.orderService,
      this.registerOrderEventPublisher,
    );
    return await useCase.execute(command);
  }

  
}
