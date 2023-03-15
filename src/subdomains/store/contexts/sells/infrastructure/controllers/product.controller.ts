import { Body, Controller, Post } from "@nestjs/common";
import { UpdateExpirationProductUseCase, UpdatePriceProductUseCase, UpdateStockProductUseCase, UpdateTypeProductUseCase } from "../../application/use-cases/counter/product";
import { UpdatedPricePublisher } from "../messaging/publisher/counter/poster/updated-price.message-publisher";
import { UpdatedTypePublisher } from "../messaging/publisher/counter/poster/updated-type.message-publisher";
import { UpdatedExpirationPublisher } from "../messaging/publisher/counter/product/updated-expiration.message-publisher";
import { UpdatedStockPublisher } from "../messaging/publisher/counter/product/updated-stock.message-publisher";
import { CounterService, PosterService, ProductService } from "../persistence/services";
import { ProductUpdateExpirationCommand } from "../utils/commands/counter/product/update-expiration.command";

@Controller('product')
export class ProductController {
    constructor(
        private readonly counterService: CounterService,
        private readonly posterService: PosterService,
        private readonly productService: ProductService,
        
        private readonly updatedExpirationPublisher: UpdatedExpirationPublisher,
        private readonly updatedPricePublisher: UpdatedPricePublisher,
        private readonly updatedStockPublisher: UpdatedStockPublisher,
        private readonly updatedTypePublisher: UpdatedTypePublisher
    ) {}

    @Post("/updated-expiration")
    async updatedExpiration(@Body() command: ProductUpdateExpirationCommand) {
        const useCase = new UpdateExpirationProductUseCase(
            this.productService,
            this.updatedExpirationPublisher
        )
        return await useCase.execute(command)
    }

    // @Post("/updated-price")
    // async updatedPrice(@Body() command: ProductUpdateExpirationCommand) {
    //     const useCase = new UpdatePriceProductUseCase(
    //         this.productService,
    //         this.updatedPricePublisher
    //     )
    //     return await useCase.execute(command)
    // }
    
    @Post("/updated-stock")
    async updatedStock(@Body() command: ProductUpdateExpirationCommand) {
        const useCase = new UpdateStockProductUseCase(
            this.productService,
            this.updatedStockPublisher
        )
        return await useCase.execute(command)
    }
    
    // @Post("/updated-type")
    // async updatedType(@Body() command: ProductUpdateExpirationCommand) {
    //     const useCase = new UpdateTypeProductUseCase(
    //         this.productService,
    //         this.updatedTypePublisher
    //     )
    //     return await useCase.execute(command)
    // }
}