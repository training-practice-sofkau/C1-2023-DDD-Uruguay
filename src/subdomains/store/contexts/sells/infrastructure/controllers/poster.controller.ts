import { Body, Controller, Post } from "@nestjs/common"
import { UpdateImageUseCase, UpdatePricePosterUseCase, UpdateTypePosterUseCase } from "../../application/use-cases/counter/poster"
import { UpdatedImagePublisher } from "../messaging/publisher/counter/poster/updated-image.message-publisher"
import { UpdatedPricePublisher } from "../messaging/publisher/counter/poster/updated-price.message-publisher"
import { UpdatedTypePublisher } from "../messaging/publisher/counter/poster/updated-type.message-publisher"
import { CounterService, PosterService, ProductService } from "../persistence/services"
import { PosterUpdateImageCommand } from "../utils/commands/counter/poster/update-image.command"
import { PosterUpdatePriceCommand } from "../utils/commands/counter/poster/update-price.command"
import { PosterUpdateTypeCommand } from "../utils/commands/counter/poster/update-type.command"


@Controller('poster')
export class PosterController {

    constructor(
        private readonly counterService: CounterService,
        private readonly posterService: PosterService,
        private readonly productService: ProductService,

        private readonly updatedImagePublisher: UpdatedImagePublisher,
        private readonly updatedPricePublisher: UpdatedPricePublisher,
        private readonly updatedTypePublisher: UpdatedTypePublisher

    ) { }

    // @Post("/updated-image")
    // async updatedImage(@Body() command: PosterUpdateImageCommand) {
    //     const useCase = new UpdateImageUseCase(
    //         this.productService,
    //         this.updatedImagePublisher
    //     )
    //     return await useCase.execute(command)
    // }

    // @Post("/updated-price")
    // async updatedPrice(@Body() command: PosterUpdatePriceCommand) {
    //     const useCase = new UpdatePricePosterUseCase(
    //         this.productService,
    //         this.updatedPricePublisher
    //     )
    //     return await useCase.execute(command)
    // }

    // @Post("/updated-type")
    // async updatedType(@Body() command: PosterUpdateTypeCommand) {
    //     const useCase = new UpdateTypePosterUseCase(
    //         this.productService,
    //         this.updatedTypePublisher
    //     )
    //     return await useCase.execute(command)
    // }
}