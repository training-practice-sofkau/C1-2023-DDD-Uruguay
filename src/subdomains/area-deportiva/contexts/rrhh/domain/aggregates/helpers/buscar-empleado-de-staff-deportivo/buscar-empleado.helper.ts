import { IStaffDeportivoDomainService } from '../../../services/staff-Deportivo/staff-deportivo.domain-service';
import { EmpleadoBuscadoEventPublisher } from '../../../events/publishers/staff-deporitvo/empleado-buscado.event-publisher';
import { AggregateRootException } from 'src/libs';
import { EmpleadoDomainEntity } from '../../../entities';

export const BuscarEmpleadoHelper = async (
    entity: EmpleadoDomainEntity,
    service?: IStaffDeportivoDomainService,
    event?: EmpleadoBuscadoEventPublisher,
):Promise<EmpleadoDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Staff Deportivo indefinido')

    if(!event) throw new AggregateRootException('Evento creador de Staff Deportivo indefinido');

    const result = await service.BuscarEmpleado(entity);
    event.response = result;
    event.publish();
    return result;

}