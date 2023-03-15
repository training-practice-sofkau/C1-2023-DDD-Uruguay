import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class subscriberGeneric {
  @EventPattern('order-name-modified-successfull')
  NameModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}
@EventPattern('order-phone-modified-successfull')
PhoneModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
  console.log('----------------------');
  console.log('Data: ', data.data);
  console.log('Context: ', context);
  console.log('----------------------');


} @EventPattern('order-manga-name-modified-successfull')
NameMangaModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-manga-price-modified-successfull')
PrinceModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-manga-state-modified-successfull')
StateModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-added-modified-successfull')
ClientAddEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-added-modified-successfull')
OrderAddEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-client-modified-successfull')
ClientObtainedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-delete')
DeleteOrderEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-manga-get-successfull')
ClientModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}

 @EventPattern('order-client-modified-successfull')
MangaObtainedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-manga-modified-successfull')
MangaModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('order-modified-successfull')
OrderModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('sale-bill-get-successfull')
BillObtainedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('sale-total-modified-successfull')
TotalModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('sale-payment-modified-successfull')
PaymentMethodEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
} @EventPattern('sale-seller-name-modified-successfull')
SellerNameModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}


@EventPattern('sale-added-sale-modified-successfull')
AddedSaleEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}
@EventPattern('sale-added-seller-modified-successfull')
AddedSellerEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}
@EventPattern('sale-seller-name-modified-successfull')
BillModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}
@EventPattern('sale-seller-modified-successfull')
SellerModifiedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}
 @EventPattern('sale-sales-get-successful')
 SalesObtainedEventPublisher(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log('----------------------');
    console.log('Data: ', data.data);
    console.log('Context: ', context);
    console.log('----------------------');

  
}






}

