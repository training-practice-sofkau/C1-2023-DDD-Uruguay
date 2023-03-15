import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  OrderManagementModule,
} from './subdomains/Installations/contexts/order-management/infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'environments/.env.' + process.env.NODE_ENV
    }),
    OrderManagementModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
