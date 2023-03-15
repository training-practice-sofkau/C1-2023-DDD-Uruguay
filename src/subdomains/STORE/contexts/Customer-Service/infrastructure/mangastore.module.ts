import { BillControllerController } from './controllers/bill-controller.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { OrderController } from './controllers/Order-controller';
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModuleModule } from './persitence/persistencemodule.module';
import { SaleController } from './controllers/Sale-Controller';
import { ClientController } from './controllers/Client-controller';
import { SellerController } from './controllers/Seller-controller';
import { mangaController } from './controllers/Manga-controller';

@Module({
    imports: [PersistenceModuleModule, MessagingModule,
],
    controllers: [OrderController, SaleController, BillControllerController,ClientController,SellerController,mangaController],
    providers: [],
    exports:[]
})
export class MangaStoreModule {}
