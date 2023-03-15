
import { AggregateRootException } from "src/libs";
import { NegociacionDomainEntity } from "../../../entities";
import { INegociacionDomainService } from "../../../services";
import { EquipoNuevoNegociacionModificadoEventPublisher } from "../../../events/publishers/negociacion";
import { StateNegociacionModificadoEventPublisher } from '../../../events/publishers/negociacion/state-modificado.event-publisher';

export const ModificarStateDeNegociacionHelper = async (
    negociacionId:string,
    entity: NegociacionDomainEntity,
    service?: INegociacionDomainService,
    event?:StateNegociacionModificadoEventPublisher,
):Promise<NegociacionDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Staff Deportivo indefinido')

    if(!event) throw new AggregateRootException('Evento creador de Staff Deportivo indefinido');

    const result = await service.NegociacionModificarState(negociacionId,entity);
    event.response = result;
    event.publish();
    return result;

}