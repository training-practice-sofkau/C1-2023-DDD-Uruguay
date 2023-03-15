import { Module } from '@nestjs/common';

import {
  InvoiceController,
  OrderController,
} from './controllers';
import { MessagingModule } from './messaging';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [InvoiceController, OrderController],
  providers: [],
  exports: [],
})
export class OrderManagementModule {}
