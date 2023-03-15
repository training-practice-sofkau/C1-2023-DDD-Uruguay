import { Body, Controller, Post } from '@nestjs/common';
import { TramiteService } from '../persistence/services/tramite.service';
import { TramiteAgregadoEventPublisher } from '../../domain/events/publishers/staff-deporitvo/tramite-agregado.event-publisher';
import { AgregarTramiteUseCase } from '../../application/use-cases/staff-deportivo/agregar-tramite.use-case';
import { CrearTramiteCommand } from '../utils/commands/staffDeportivo/tramite/crear-tramite.commands';
import { BuscarTramiteCommand } from '../utils/commands/staffDeportivo/tramite/buscar-tramite.commands';
import { BuscarTramiteUseCase } from '../../application';
import { TramiteBuscadoEventPublisher } from '../../domain/events/publishers/staff-deporitvo/tramite-buscado.event-publisher';

@Controller('tramite')
export class TramiteController {
    constructor(
        private readonly tramiteService: TramiteService,
        private readonly tramiteCreadoEventPublisher: TramiteAgregadoEventPublisher,
        private readonly tramitebuscadoEventPublisher: TramiteBuscadoEventPublisher,
    ) {}

    @Post('/crear')
    async crearTramite(@Body() command: CrearTramiteCommand) {
        const useCase = new AgregarTramiteUseCase(
            this.tramiteService,
            this.tramiteCreadoEventPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/buscar')
    async buscarTramite(@Body() command: BuscarTramiteCommand) {
        const useCase = new BuscarTramiteUseCase(
            this.tramiteService,
            this.tramiteCreadoEventPublisher,
        );
        return await useCase.execute(command);
    }


  
}
