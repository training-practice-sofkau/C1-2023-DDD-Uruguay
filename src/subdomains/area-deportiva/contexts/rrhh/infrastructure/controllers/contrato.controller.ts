import { Body, Controller, Post } from '@nestjs/common';
import { BuscarCesiontPublisher } from '../messaging/publishers/secretaria/cesion/buscar-cesion.publisher';
import { BuscarContratoPublisher, NegociarCesiontPublisher } from '../messaging';
import { NegociarCesionCommand } from '../utils/commands/secretaria/cesion/negociar-cesion-commands';
import { CrearCesionUseCase } from '../../application/use-cases/secretaria/crear-cesion.use-case';
import { BuscarCesionUseCase } from '../../application/use-cases/secretaria/buscar-cesion.use-case';
import { BuscarCesionCommand } from '../utils/commands/secretaria/cesion/buscar-cesion.commands';
import { ContratoService } from '../persistence';
import { NegociarContratoPublisher } from '../messaging/publishers/secretaria/contrato/negociar-contrato-publisher';
import { CrearContratoUseCase } from '../../application/use-cases/secretaria/crear-contrato.use-case';
import { BuscarContatoUseCase } from '../../application';
import { BuscarcontratoCommand } from '../utils/commands/secretaria/contrato/buscar-contrato.commands';

@Controller('contrato')
export class ContratoController {
    constructor(
        private readonly contratoService: ContratoService,

        private readonly contratoBuscadoEvent : BuscarContratoPublisher,

        private readonly contratoNegociadoEventPublisher: NegociarContratoPublisher,
    ) {}

    @Post('/crear')
    async crearContrato(@Body() command: NegociarCesionCommand) {
        const useCase = new CrearContratoUseCase(
            this.contratoService,
            this.contratoNegociadoEventPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/buscar')
    async buscarContrato(@Body() command: BuscarcontratoCommand ) {
        const useCase = new BuscarContatoUseCase (
            this.contratoService,
            this.contratoBuscadoEvent,
        );
        return await useCase.execute(command);
    }

  
}