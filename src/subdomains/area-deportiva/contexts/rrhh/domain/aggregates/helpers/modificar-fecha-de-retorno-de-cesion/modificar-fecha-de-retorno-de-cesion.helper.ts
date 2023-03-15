import { AggregateRootException } from 'src/libs';
import { CesionDomainEntity } from '../../../entities/cesion/cesion.domain-entity';
import { ICesionDomainService } from '../../../services/secretaria/cesion.domain-service';
import { FechaContratoModificadaEventPublisher } from '../../../events/publishers/contrato/fecha-modificada.event-publisher';
export const  ModificarFechaDeRetornoDeCesionHelper = async (
    entity: CesionDomainEntity,
    service?: ICesionDomainService,
    event?: FechaContratoModificadaEventPublisher,
):Promise<CesionDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Cesion indefinido')

    if(!event) throw new AggregateRootException('Evento modificar equipo de salida de cesion indefinido');

    const result = await service.CesionModificarEquipoSalida(entity.cesionId.valueOf(),entity);
    event.response = result;
    event.publish();
    return result;

}