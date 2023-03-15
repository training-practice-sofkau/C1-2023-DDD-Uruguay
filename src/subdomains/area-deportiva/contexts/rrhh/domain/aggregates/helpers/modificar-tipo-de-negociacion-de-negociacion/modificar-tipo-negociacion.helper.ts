import { AggregateRootException } from "src/libs";
import { NegociacionDomainEntity } from "../../../entities";
import { INegociacionDomainService } from "../../../services";
import { TipoDeNegociacionModificadoEventPublisher } from "../../../events/publishers/negociacion";

export const ModificarTipoNegociacionHelper = async (
    negociacionId:string,
    entity: NegociacionDomainEntity,
    service?: INegociacionDomainService,
    event?: TipoDeNegociacionModificadoEventPublisher,
):Promise<NegociacionDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Staff Deportivo indefinido')

    if(!event) throw new AggregateRootException('Evento creador de Staff Deportivo indefinido');

    const result = await service.NegociacionModificarTipoNegociacion(negociacionId,entity);
    event.response = result;
    event.publish();
    return result;

}