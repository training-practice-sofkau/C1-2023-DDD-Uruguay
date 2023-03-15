import { ValueObjectErrorHandler } from '../../../../../../../libs/sofka/bases/value-object-error-handler.base';
import { IUseCase } from '../../../../../../../libs/sofka/interface/use-case.interface';
import { StaffDeportivoAggregate } from '../../../domain/aggregates/staff-deportivo/staff-deportivo.aggregate';
import { IStaffDeportivoCreadoResponse } from '../../../domain/interfaces/responses/staff-deportivo/staff-deportivo-creado.response';
import { IStaffDeportivoDomainService } from '../../../domain/services/staff-Deportivo/staff-deportivo.domain-service';
import { StaffDeportivoCreadoEventPublisher } from '../../../domain/events/publishers/staff-deporitvo/staff-depotivo-creado.event-publisher';
import { StaffDeportivoDomainEntity } from '../../../domain/entities/staff-deportivo/staff-deportivo.entity';
import { NombreValueObject } from '../../../domain/value-objects/nombre/nombre.value-object';
import { ValueObjectException } from 'src/libs';
import { TramiteBuscadoEventPublisher } from '../../../domain/events/publishers/staff-deporitvo/tramite-buscado.event-publisher';
import { EmpleadoBuscadoEventPublisher } from '../../../domain/events/publishers/staff-deporitvo/empleado-buscado.event-publisher';
import { BuscarTramiteUseCase } from './buscar-tramite.use-case';
import { BuscarEmpleadoUseCase } from './buscar-empleado.use-case';
import { IdValueObject } from '../../../domain/value-objects';
import { ICrearStaffDeportivoCommands } from '../../../domain/interfaces/commands/staff-deportivo';
import { IEmpleadoDomainService, ITramiteDomainService } from '../../../domain/services';


export class CrearStaffDeportivoUseCase 
    extends ValueObjectErrorHandler
    implements IUseCase<ICrearStaffDeportivoCommands, IStaffDeportivoCreadoResponse> {
        
        private readonly aggregateRoot:StaffDeportivoAggregate;

            constructor(
            private readonly staffDeportivoService: IStaffDeportivoDomainService,
            private readonly empleadoService: IEmpleadoDomainService,
            private readonly tramiteService: ITramiteDomainService,
            private readonly staffDeportivoCreadoEvent : StaffDeportivoCreadoEventPublisher,
            private readonly tramiteBuscadoEvent : TramiteBuscadoEventPublisher,
            private readonly empleadoBuscadoEvent : EmpleadoBuscadoEventPublisher,
        ){
            super();
            this.aggregateRoot = new StaffDeportivoAggregate({staffDeportivoService,staffDeportivoCreadoEvent,tramiteBuscadoEvent,empleadoBuscadoEvent});
        }
   
    async execute(command: ICrearStaffDeportivoCommands): Promise<IStaffDeportivoCreadoResponse> {

        //Creo los value object 
        const staffDeportivoId = new IdValueObject(command.staffDeportivoId);
        const nombre = new NombreValueObject(command.nombre);

    
        // Recopilando errores
        if (staffDeportivoId.hasErrors() === true) this.setErrors(staffDeportivoId.getErrors());

        if (nombre.hasErrors() === true) this.setErrors(nombre.getErrors());
    
        // Validando errores
        if (this.hasErrors() === true)
            throw new ValueObjectException(
            'Errores en el comando "ICrearStaffDeportivoCommand"',
            this.getErrors(),
            );
            
        const obtenerTramite = new BuscarTramiteUseCase(this.tramiteService,this.tramiteBuscadoEvent);
        const obtnerEmpleado = new BuscarEmpleadoUseCase(this.empleadoService,this.empleadoBuscadoEvent);
       
        // Ejecución de la lógica del caso de uso
        const entity = new StaffDeportivoDomainEntity({
           
            staffDeportivoId: staffDeportivoId,
            nombre: nombre,
            tramite: (await obtenerTramite.execute({tramiteId: command.tamite})).data ,
            empleado: (await obtnerEmpleado.execute({empleadoId : command.empleado})).data,
            
        });
        const result = await this.aggregateRoot.CrearStaffDeportivo(entity);//Se le puede pasar directamente la entidad como tambien se le pude pasar la interface 
    
        // Retornando la respuesta
        return { success: true,data: result };

    }


    }
