import { AggregateRootException } from "src/libs";
import { NegociacionDomainEntity } from "../../../entities";
import { INegociacionDomainService } from "../../../services";
import { EquipoSalidaNegociacionModificadoEventPublisher } from '../../../events/publishers/negociacion/equipo-salida-modificado.event-publisher';

export const ModificarEquipoSalidaDeNegociacionHelper = async (
    negociacionId:string,
    entity: NegociacionDomainEntity,
    service?: INegociacionDomainService,
    event?: EquipoSalidaNegociacionModificadoEventPublisher,
):Promise<NegociacionDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Staff Deportivo indefinido')

    if(!event) throw new AggregateRootException('Evento creador de Staff Deportivo indefinido');

    const result = await service.NegociacionModificarEquipoSalida(negociacionId,entity);
    event.response = result;
    event.publish();
    return result;

}