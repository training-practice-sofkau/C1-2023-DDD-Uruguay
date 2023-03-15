import { Controller, Get, Body, Post, Put } from "@nestjs/common";
import { GetSalesListUseCase, RegisterSaleUseCase, UpdateNameSallerUseCase } from "../../application";
import { IUpdateNameSeller } from "../../domain/interfaces/commands";
import { IAddedSaleEventPublisher, ISalesObtainedEventPublisher } from "../messaging/publisher/Sale";
import { SaleService, SellerService } from "../persitence";
import { IGetSales } from "../utils/commands/sale/IGetSales";
import { IRegisterSaleCommand } from "../utils/commands/sale/IRegisterSale";
import { IAddedSellerEventPublisher } from '../messaging/publisher/Sale/added-seller-messaging-publisher';


@Controller('Sale')
export class SaleController {


    constructor(
        private readonly SaleService: SaleService,
        private readonly ISalesObtainedEventPublisher: ISalesObtainedEventPublisher,
        private readonly IAddedSaleEventPublisher:  IAddedSaleEventPublisher,
        private readonly SellerService: SellerService,
        private readonly IAddedSellerEventPublisher:IAddedSellerEventPublisher

      
    
    
      ) {}


    @Get()
    getSale(@Body() command: IGetSales) {
      const useCase = new  GetSalesListUseCase (this.SaleService,  this.ISalesObtainedEventPublisher)
      return useCase.execute(command)
      
    }

    @Post()
    createSale(@Body() command: IRegisterSaleCommand) {
      const useCase = new RegisterSaleUseCase(
        this.SaleService,
        this.IAddedSaleEventPublisher,
      );
      useCase.execute(command);
    }

    @Put('updateSellerName')
  updateMangaStock(@Body() command: IUpdateNameSeller) {
    const useCase = new  UpdateNameSallerUseCase (this.SellerService,  this.IAddedSellerEventPublisher)
    return useCase.execute(command)
    
  }

}
