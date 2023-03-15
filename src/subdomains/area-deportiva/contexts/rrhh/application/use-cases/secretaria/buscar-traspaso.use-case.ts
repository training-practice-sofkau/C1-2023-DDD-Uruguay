import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { SecretariaAggregate } from '../../../domain/aggregates/secretaria/secretaria.aggregate';
import { ITraspasoBuscadaResponse } from '../../../domain/interfaces/responses/secretaria/traspaso-buscado.response';
import { TraspasoBuscadaEventPublisher } from "../../../domain/events/publishers/secretaria/traspaso-buscado.event-publisher";
import { IBuscarTraspasoCommands } from '../../../domain/interfaces/commands/secretaria/buscar-traspaso.commands';
import { ITraspasoDomainService } from "../../../domain/services";

export class BuscarTraspasoUseCase extends ValueObjectErrorHandler
implements IUseCase<IBuscarTraspasoCommands, ITraspasoBuscadaResponse> {

    private readonly aggregateRoot: SecretariaAggregate;

    constructor(
        private readonly traspasoService: ITraspasoDomainService,
        private readonly traspasoBuscadoEvent: TraspasoBuscadaEventPublisher,
    ) {
        super();
        this.aggregateRoot = new SecretariaAggregate({ traspasoService, traspasoBuscadoEvent });
    }

    //Ejecutar el comando , usando otra funcion para crear lo que necesita el comando 
    async execute(command?: IBuscarTraspasoCommands): Promise<ITraspasoBuscadaResponse> {
        const data = await this.aggregateRoot.BuscarTraspaso(command.traspasoId)

        return { success: data ? true : false, data }
    }



}

