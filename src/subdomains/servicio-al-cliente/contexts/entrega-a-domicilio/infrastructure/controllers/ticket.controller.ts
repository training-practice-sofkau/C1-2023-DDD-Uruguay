import { Body, Controller, Get, Post, Param } from '@nestjs/common';

import {
    CrearClienteUseCase,
    CrearRepartidorUseCase
} from '../../application/use-cases/ticket';

import {
    ClienteService,
    RepartidorService,
    TicketService
} from '../persistence';

import {
    CrearTicketCommand,
    CrearClienteCommand,
    CrearRepartidorCommand
} from '../utils/commands/ticket';

import {
    ClienteCreadoPublisher,
    RepartidorCreadoPublisher,
    TicketCreadoPublisher
} from '../messaging/publisher';


@Controller('ticket')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
        private readonly ticketCreadoEventPublisherBase: TicketCreadoPublisher,

        private readonly clienteService: ClienteService,
        private readonly clienteCreadoEventPublisherBase: ClienteCreadoPublisher,

        private readonly repartidorService: RepartidorService,
        private readonly repartidorCreadoEventPublisherBase: RepartidorCreadoPublisher,
    ) {}

    // @Post('/crear-ticket')
    // async crearTicket(@Body() command: CrearTicketCommand) {
    //     const useCase = new CrearTicketUseCase(
    //         this.ticketService,
    //         this.ticketCreadoEventPublisherBase,
    //     );
    //     return await useCase.execute(command);
    // }

    @Post('/crear-cliente')
    async crearCliente(@Body() command: CrearClienteCommand) {
        const useCase = new CrearClienteUseCase(
            this.clienteService,
            this.clienteCreadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-repartidor')
    async crearRepartidor(@Body() command: CrearRepartidorCommand) {
        const useCase = new CrearRepartidorUseCase(
            this.repartidorService,
            this.repartidorCreadoEventPublisherBase,
        );
        return await useCase.execute(command);
    }
  
}
