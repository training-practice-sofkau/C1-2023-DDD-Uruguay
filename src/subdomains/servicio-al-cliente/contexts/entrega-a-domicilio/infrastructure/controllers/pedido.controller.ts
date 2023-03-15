import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';

import {
    CrearPedidoUseCase,
    CrearBebidaUseCase,
    CrearEntradaUseCase,
    CrearPlatoPrincipalUseCase,
    CrearPostreUseCase,
    ObtenerPedidoUseCase,
    ObtenerBebidaUseCase,
    CambiarEstadoPedidoUseCase,
    CambiarPrecioPedidoUseCase,
    CambiarNombreBebidaUseCase,
    CambiarTamanioBebidaUseCase
} from '../../application';

import {
    BebidaService,
    EntradaService,
    PedidoService,
    PlatoPrincipalService,
    PostreService
} from '../persistence';

import {
    CrearPedidoCommand,
    CrearBebidaCommand,
    CrearEntradaCommand,
    CrearPlatoPrincipalCommand,
    CrearPostreCommand,
    ObtenerPedidoCommand,
    ObtenerBebidaCommand,
    CambiarEstadoPedidoCommand,
    CambiarPrecioPedidoCommand,
    CambiarNombreBebidaCommand,
    CambiarTamanioBebidaCommand
} from '../utils/commands/pedido';

import {
    BebidaCreadaPublisher,
    EntradaCreadaPublisher,
    PedidoCreadoPublisher,
    PlatoPrincipalCreadoPublisher,
    PostreCreadoPublisher,
    PedidoObtenidoPublisher,
    BebidaObtenidaPublisher,
    EstadoPedidoCambiadoPublisher,
    PrecioPedidoCambiadoPublisher,
    NombreBebidaCambiadoPublisher,
    TamanioBebidaCambiadoPublisher
} from '../messaging/publisher';

@Controller('pedido')
export class PedidoController {
    constructor(
        private readonly pedidoService: PedidoService,
        private readonly pedidoCreadoEventPublisherBase: PedidoCreadoPublisher,
        private readonly pedidoObtenidoEventPublisherBase: PedidoObtenidoPublisher,
        private readonly estadoPedidoCambiadoEventPublisherBase: EstadoPedidoCambiadoPublisher,
        private readonly precioPedidoCambiadoEventPublisherBase: PrecioPedidoCambiadoPublisher,

        private readonly entradaService: EntradaService,
        private readonly entradaCreadaEventPublisherBase: EntradaCreadaPublisher,

        private readonly platoPrincipalService: PlatoPrincipalService,
        private readonly platoPrincipalCreadoEventPublisherBase: PlatoPrincipalCreadoPublisher,

        private readonly bebidaService: BebidaService,
        private readonly bebidaCreadaEventPublisherBase: BebidaCreadaPublisher,
        private readonly bebidaObtenidaEventPublisherBase: BebidaObtenidaPublisher,
        private readonly nombreBebidaCambiadoEventPublisherBase: NombreBebidaCambiadoPublisher,
        private readonly tamanioBebidaCambiadoEventPublisherBase: TamanioBebidaCambiadoPublisher,

        private readonly postreService: PostreService,
        private readonly postreCreadoEventPublisherBase: PostreCreadoPublisher
    ) {}

    // @Post('/crear-pedido')
    // async crearPedido(@Body() command: CrearPedidoCommand) {
    //     const useCase = new CrearPedidoUseCase(
    //         this.pedidoService,
    //         this.pedidoCreadoEventPublisherBase,
    //     );
    //     return await useCase.execute(command);
    // }

    @Post('/crear-entrada')
    async crearEntrada(@Body() command: CrearEntradaCommand) {
        const useCase = new CrearEntradaUseCase(
            this.entradaService,
            this.entradaCreadaEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-plato-principal')
    async crearPlatoPrincipal(@Body() command: CrearPlatoPrincipalCommand) {
        const useCase = new CrearPlatoPrincipalUseCase(
            this.platoPrincipalService,
            this.platoPrincipalCreadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-postre')
    async crearPostre(@Body() command: CrearPostreCommand) {
        const useCase = new CrearPostreUseCase(
            this.postreService,
            this.postreCreadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-bebida')
    async crearBebida(@Body() command: CrearBebidaCommand) {
        const useCase = new CrearBebidaUseCase(
            this.bebidaService,
            this.bebidaCreadaEventPublisherBase,
        );
        return await useCase.execute(command);
    }


    @Get('/obtener-pedido')
    async obtenerPedido(@Body() command: ObtenerPedidoCommand) {
        const useCase = new ObtenerPedidoUseCase(
            this.pedidoService,
            this.pedidoObtenidoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Get('/obtener-bebida')
    async obtenerBebida(@Body() command: ObtenerBebidaCommand) {
        const useCase = new ObtenerBebidaUseCase(
            this.bebidaService,
            this.bebidaObtenidaEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Patch('/cambiar-estado-pedido')
    async cambiarEstadoPedido(@Body() command: CambiarEstadoPedidoCommand) {
        const useCase = new CambiarEstadoPedidoUseCase(
            this.pedidoService,
            this.estadoPedidoCambiadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Patch('/cambiar-precio-pedido')
    async cambiarPrecioPedido(@Body() command: CambiarPrecioPedidoCommand) {
        const useCase = new CambiarPrecioPedidoUseCase(
            this.pedidoService,
            this.precioPedidoCambiadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Patch('/cambiar-nombre-bebida')
    async cambiarNombreBebida(@Body() command: CambiarNombreBebidaCommand) {
        const useCase = new CambiarNombreBebidaUseCase(
            this.bebidaService,
            this.nombreBebidaCambiadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Patch('/cambiar-tamanio-bebida')
    async cambiarTamanioBebida(@Body() command: CambiarTamanioBebidaCommand) {
        const useCase = new CambiarTamanioBebidaUseCase(
            this.bebidaService,
            this.tamanioBebidaCambiadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }
  
}
