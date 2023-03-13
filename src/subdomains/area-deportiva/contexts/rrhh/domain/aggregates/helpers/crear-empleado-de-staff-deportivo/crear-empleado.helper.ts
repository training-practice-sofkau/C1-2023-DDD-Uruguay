import { AggregateRootException } from 'src/libs';
import { EmpleadoDomainEntity } from '../../../entities/empleado/EmpleadoDomainEntity';
import { EmpleadoAgregadoEventPublisher } from '../../../events/publishers/staff-deporitvo/empleado-agregado.event-publisher';
import { IStaffDeportivoDomainService } from '../../../services';

export const CrearEmpleadoHelper = async (
    entity: EmpleadoDomainEntity,
    service?: IStaffDeportivoDomainService,
    event?: EmpleadoAgregadoEventPublisher,
):Promise<EmpleadoDomainEntity> => { 
    
    if(!service)
    throw new AggregateRootException('Servicio Staff Deportivo indefinido')

    if(!event) throw new AggregateRootException('Evento creador de Staff Deportivo indefinido');

    const result = await service.AgregarEmpleado(entity);
    event.response = result;
    event.publish();
    return result;
}