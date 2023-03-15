import { ValueObjectErrorHandler, IUseCase } from "src/libs";
import { TramiteDomainEntity } from '../../../domain/entities/tramite/tramite.entity.interface';
import { TramiteBuscadoEventPublisher } from '../../../domain/events/publishers/staff-deporitvo/tramite-buscado.event-publisher';
import { IStaffDeportivoDomainService } from '../../../domain/services/staff-Deportivo/staff-deportivo.domain-service';
import { ItramiteBuscadoResponse } from '../../../domain/interfaces/responses/staff-deportivo/tamite-agregado.response';

import { IBuscarTramiteCommands } from '../../../domain/interfaces/commands/staff-deportivo/buscar-tramite.commands';
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { ITramiteDomainService } from "../../../domain/services";

export class BuscarTramiteUseCase extends ValueObjectErrorHandler
    implements IUseCase<IBuscarTramiteCommands, ItramiteBuscadoResponse> {

    private readonly aggregateRoot: StaffDeportivoAggregate;

    constructor(
        private readonly tramiteService: ITramiteDomainService,
        private readonly tramiteBuscadoEvent: TramiteBuscadoEventPublisher,
    ) {
        super();
        this.aggregateRoot = new StaffDeportivoAggregate({ tramiteService, tramiteBuscadoEvent });
    }

    //Ejecutar el comando , usando otra funcion para crear lo que necesita el comando 
    async execute(command?: IBuscarTramiteCommands): Promise<ItramiteBuscadoResponse> {
        const data = await this.exectueOrderAggregateRoot(command.tramiteId);

        return { success: data ? true : false, data }
    }


    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueOrderAggregateRoot(
        tramiteId:string,
    ): Promise<TramiteDomainEntity | null> {
        return this.aggregateRoot.BuscarTramite(tramiteId)
    }
}


