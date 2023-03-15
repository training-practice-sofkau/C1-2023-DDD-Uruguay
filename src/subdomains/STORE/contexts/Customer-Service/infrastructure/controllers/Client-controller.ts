import { UpdatePhoneClientCaseUse } from './../../application/use-cases/Order-Use-case/client-case-use/update-phone-client-case-use/update-phone-client-case-use';
import { Controller, Post, Body, Patch, Put, Get, Param } from '@nestjs/common';
import { AddCustomerCaseUse, UpdateNameClientCaseUse } from '../../application';
import { IAddClient, UpdateNameClient } from '../../domain/interfaces/commands';
import {
  IClientAddEventPublisher,
  IClientOrderObtainedEventPublisher,
  INameModifiedEventPublisher,
  IOrderAddEventPublisher,
  IPhoneModifiedEventPublisher,
} from '../messaging/publisher/order';
import { ClientService } from '../persitence/services/OrderServices/ClientService';
import { IupdatePhoneClient } from '../utils/commands/order/IupdatePhoneClient';
import { IUpdateNameClient } from '../utils/commands/order/IUpdateNameClient';
import { IaddClientCOmmand } from '../utils/commands/order/IaddClientCOmmand';
import { OrderService } from '../persitence';
import { IGetClientCommand } from '../utils/commands/order/IGet-Client-Command';
import { GetClientCaseUse } from '../../application/use-cases/Order-Use-case/get-client-case-use/get-client-case-use';

@Controller('Client')
export class ClientController {
  constructor(
    private readonly ClientService: ClientService,
    private readonly ModifiedClientEventPublisher: INameModifiedEventPublisher,
    private readonly IPhoneModifiedEventPublisher: IPhoneModifiedEventPublisher,
    private readonly AddCustomerEventPublisher: IClientAddEventPublisher,
    private readonly orderService: OrderService,
    private readonly IClientOrderObtainedEventPublisher: IClientOrderObtainedEventPublisher,


  ) {}

  @Put('update-client-name')
  updateClientName(@Body() command: IUpdateNameClient) {
    const useCase = new UpdateNameClientCaseUse(
      this.ClientService,
      this.ModifiedClientEventPublisher,
    );
    useCase.execute(command);
  }

  @Put('update-client-phone')
  updateClientPhone(@Body() command: IupdatePhoneClient) {
    const useCase = new UpdatePhoneClientCaseUse(
      this.ClientService,
      this.IPhoneModifiedEventPublisher,
    );
    useCase.execute(command);
  }


  @Post('create-Customer')
  createCustomer(@Body() command: IaddClientCOmmand) {
    const useCase = new AddCustomerCaseUse(
      this.orderService,
      this.AddCustomerEventPublisher,
    );
    return useCase.execute(command);
  }


  @Get(':id')
  getClient(@Param('id') id: string ) {
    const command =  new IGetClientCommand
    command.ClientID = id; // Asignar el valor del id al objeto 
    
    const useCase = new GetClientCaseUse(this.orderService, this.IClientOrderObtainedEventPublisher);
    return useCase.execute(command);
  }
}
