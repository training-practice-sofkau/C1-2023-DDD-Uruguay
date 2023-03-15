import { IBuscarContratoCommands } from '../../../domain/interfaces/commands/secretaria/buscar-contrato.commands';
import { IContratoBuscadaResponse } from '../../../domain/interfaces/responses/secretaria/contrato-buscado.response';
import { ContratoBuscadaEventPublisher } from '../../../domain/events/publishers/secretaria/contrato-buscado.event-publisher';
import { ValueObjectErrorHandler, IUseCase } from 'src/libs';
import { SecretariaAggregate } from '../../../domain/aggregates';
import { IContratoDomainService } from '../../../domain/services';
export class BuscarContatoUseCase extends ValueObjectErrorHandler
implements IUseCase<IBuscarContratoCommands, IContratoBuscadaResponse> {

    private readonly aggregateRoot: SecretariaAggregate;

    constructor(
        private readonly contratoService: IContratoDomainService,
        private readonly contratoBuscadoEvent: ContratoBuscadaEventPublisher
        ,
    ) {
        super();
        this.aggregateRoot = new SecretariaAggregate({ contratoService, contratoBuscadoEvent });
    }
    
        //Ejecutar el comando , usando otra funcion para crear lo que necesita el comando 
        async execute(command?: IBuscarContratoCommands): Promise<IContratoBuscadaResponse> {
            const data = await this.aggregateRoot.BuscarContrato(command.contratoId);
    
            return { success: data ? true : false, data }
        }
}

 