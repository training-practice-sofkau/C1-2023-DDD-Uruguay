import { Body, Controller, Post } from '@nestjs/common';
import { SecretariaService } from '../persistence/services/secretaria.service';
import { CrearSecretariaUseCase } from '../../application/use-cases/secretaria/crear-secretaria.use-case';
import {  CrearSecretariaCommand } from '../utils/commands/secretaria/crear-secretaria.commands';
import { CrearSecretariaPublisher } from '../messaging/publishers/secretaria/crear-secretaria.publisher';
import { BuscarContratoPublisher } from '../messaging/publishers/secretaria/contrato/buscar-contrato.publisher';
import { BuscarCesiontPublisher } from '../messaging/publishers/secretaria/cesion/buscar-cesion.publisher';
import { BuscarTraspasoPublisher } from '../messaging';
import { ContratoService } from '../persistence/services/contrato.service';
import { CesionService } from '../persistence/services/cesion.service';
import { TraspasoService } from '../persistence/services/traspaso.service';

@Controller('secretaria')
export class SecretariaController {
    constructor(
        private readonly secretariaService: SecretariaService,
        private readonly contratoService: ContratoService,
        private readonly cesionService: CesionService,
        private readonly traspasoService: TraspasoService,
        
        private readonly secretariaCreadaEvent : CrearSecretariaPublisher,
        private readonly contratoBuscadoEvent : BuscarContratoPublisher,
        private readonly cesionBuscadaEvent : BuscarCesiontPublisher,
        private readonly traspasoBuscadoEvent : BuscarTraspasoPublisher,
    ) {}

    @Post('/crear')
    async crearTramite(@Body() command: CrearSecretariaCommand) {
        const useCase = new CrearSecretariaUseCase(
            this.secretariaService,
            this.contratoService,
            this.cesionService,
            this.traspasoService,
            this.secretariaCreadaEvent,
            this.contratoBuscadoEvent,
            this.cesionBuscadaEvent,
            this.traspasoBuscadoEvent,
        );
        return await useCase.execute(command);
    }

}
