import { IAddedSellerEventPublisher } from './../messaging/publisher/Sale/added-seller-messaging-publisher';
import { Controller, Get, Body, Post } from "@nestjs/common";
import { AddSallerUseCase,  GetSellerUseCase } from "../../application";
import { SaleService } from "../persitence";
import { SellerService } from '../persitence/services/SaleServices/SellerService';
import { IUpdateNameSellerName } from '../utils/commands/sale/IUpdateName';
import { IGetSeller } from '../utils/commands/sale/IGetSeller';
import { ISellerObtainedEventPublisher } from '../messaging/publisher/Sale/Seller/ISellerObtainedEventPublisher';
import { IAddsallerCommand } from '../utils/commands/sale/IAddsaller';


@Controller('Seller')
export class SellerController {


    constructor(
        private readonly SaleService: SaleService,
        private readonly  SellerService: SellerService,
        private readonly  IAddedSellerEventPublisher : IAddedSellerEventPublisher ,
      private readonly  ISellerObtainedEventPublisher : ISellerObtainedEventPublisher ,
      private readonly  IUpdateNameSellerName:  IUpdateNameSellerName
        
    
    
      ) {}


    @Get()
    getSale(@Body() command: IGetSeller) {
      const useCase = new  GetSellerUseCase (this.SaleService,  this.ISellerObtainedEventPublisher)
      return useCase.execute(command)
      
    }

    @Post()
    createSeller(@Body() command: IAddsallerCommand) {
      const useCase = new AddSallerUseCase(
        this.SaleService,
        this.IAddedSellerEventPublisher,
      );
      useCase.execute(command);
    }



}
