import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateOrderUseCase,
  GetOrderUserCase,
} from '../../application/use-cases';
import {
  CreatedOrderPublisher,
  GettedOrderPublisher,
} from '../messaging/publisher';
import { OrderService } from '../persistence/services';
import {
  BenefitedService,
  EmployedService,
  KitService,
} from '../persistence/services/order';
import {
  CreateOrderCommand,
  GetOrderCommand,
} from '../utils/commands';

@ApiTags('order')
@Controller('api/order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly benefitedService: BenefitedService,
        private readonly employedService: EmployedService,
        private readonly kitService: KitService,
        private readonly createdOrderEventPublisher: CreatedOrderPublisher,
        private readonly gettedOrderEventPublisher: GettedOrderPublisher
    ) {}

    @Post('/create-order')
    async createOrder(@Body() command: CreateOrderCommand) {
        const useCase = new CreateOrderUseCase(
            this.orderService,
            this.createdOrderEventPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/get-order')
    async getOrder(@Body() command: GetOrderCommand) {
        const useCase = new GetOrderUserCase(
            this.orderService,
            this.gettedOrderEventPublisher,
        );
        return await useCase.execute(command);
    }
  
}