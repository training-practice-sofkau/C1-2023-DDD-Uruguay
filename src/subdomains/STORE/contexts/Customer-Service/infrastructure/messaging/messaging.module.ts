/*
https://docs.nestjs.com/modules
*/
import { ClientAddEventPublisher } from "../../domain/events/publishers/order"

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IClientAddEventPublisher, IClientModifiedEventPublisher, IClientOrderObtainedEventPublisher, IMangaModifiedEventPublisher, IMangaObtainedEventPublisher, INameModifiedEventPublisher, IOrderAddEventPublisher, IOrderModifiedEventPublisher, IPhoneModifiedEventPublisher } from './publisher/order';
import { IAddedSaleEventPublisher } from './publisher/Sale/Added-sale-messaging-publisher';
import { INameMangaModifiedEventPublisher } from './publisher/order/manga/name-modified-messaging-publisher';
import { ISellerNameModifiedEventPublisher } from './publisher/Sale/Seller/Seller-name-modified-messaging-publisher';
import { IPrinceModifiedEventPublisher, IStateModifiedEventPublisher } from "./publisher/order/manga";
import { ISalesObtainedEventPublisher, ISellerModifiedEventPublisher, IAddedSellerEventPublisher, IBillModifiedEventPublisher, IPaymentMethodEventPublisher, IClientObtainedEventPublisher } from "./publisher/Sale";
import { ITotalModifiedEventPublisher } from "./publisher/Sale/Bill/total-modified--messaging-publisher";
import { ISellerObtainedEventPublisher } from "./publisher/Sale/Seller/ISellerObtainedEventPublisher";
import { IBillObtainedEventPublisher } from "./publisher/Sale/IBillObtainedEventPublisher";
import { IUpdateNameSellerName } from "../utils/commands/sale/IUpdateName";


@Module({
    imports: [ClientsModule.register([
        {
            name: 'MANGA_STORE_CONTEXT',
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers:['localhost:9092'],
                },
                consumer: {
                    groupId:'consumer'
                }
            }
        },
    ]),],
    controllers: [],
    providers: [IOrderAddEventPublisher, IClientAddEventPublisher, IBillObtainedEventPublisher,
         IAddedSaleEventPublisher,INameMangaModifiedEventPublisher,IClientObtainedEventPublisher, IClientOrderObtainedEventPublisher,
         ISellerNameModifiedEventPublisher,INameModifiedEventPublisher, IOrderAddEventPublisher,  IUpdateNameSellerName, ISalesObtainedEventPublisher , ISellerModifiedEventPublisher,IAddedSellerEventPublisher, IBillModifiedEventPublisher, IClientObtainedEventPublisher ,IAddedSaleEventPublisher ,ISellerNameModifiedEventPublisher ,ISellerObtainedEventPublisher , ITotalModifiedEventPublisher , IPaymentMethodEventPublisher , IOrderModifiedEventPublisher ,IMangaModifiedEventPublisher ,IMangaObtainedEventPublisher , IClientObtainedEventPublisher , IClientModifiedEventPublisher , IClientAddEventPublisher ,IAddedSaleEventPublisher, IPhoneModifiedEventPublisher, IPrinceModifiedEventPublisher, IStateModifiedEventPublisher ],
    exports: [IOrderAddEventPublisher, IClientAddEventPublisher,IBillObtainedEventPublisher,
        IAddedSaleEventPublisher,INameMangaModifiedEventPublisher,IUpdateNameSellerName,IClientObtainedEventPublisher,IClientOrderObtainedEventPublisher,
        ISellerNameModifiedEventPublisher,INameModifiedEventPublisher, IOrderAddEventPublisher, ISalesObtainedEventPublisher , ISellerModifiedEventPublisher,IAddedSellerEventPublisher, IBillModifiedEventPublisher, IClientObtainedEventPublisher ,IAddedSaleEventPublisher ,ISellerNameModifiedEventPublisher ,ISellerObtainedEventPublisher , ITotalModifiedEventPublisher , IPaymentMethodEventPublisher , IOrderModifiedEventPublisher ,IMangaModifiedEventPublisher ,IMangaObtainedEventPublisher , IClientObtainedEventPublisher , IClientModifiedEventPublisher , IClientAddEventPublisher ,IAddedSaleEventPublisher, IPhoneModifiedEventPublisher, IPrinceModifiedEventPublisher, IStateModifiedEventPublisher ],
})
export class MessagingModule { }
