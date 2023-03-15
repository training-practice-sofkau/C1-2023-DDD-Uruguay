import { IEmpleadoDomainService } from '../../services/staff-Deportivo/empleado.domain-service';
import { IStaffDeportivoDomainService } from '../../services/staff-Deportivo/staff-deportivo.domain-service';
import { StaffDeportivoDomainEntity } from '../../entities/staff-deportivo/staff-deportivo.entity';
import { INegociacionDomainService } from '../../services/staff-Deportivo/negociacion.domain-service';
import { ITramiteDomainService } from '../../services/staff-Deportivo/tramite.domain-service';
import { EmpleadoAgregadoEventPublisher } from '../../events/publishers/staff-deporitvo/empleado-agregado.event-publisher';
import { StaffDeportivoCreadoEventPublisher } from '../../events/publishers/staff-deporitvo/staff-depotivo-creado.event-publisher';
import { TramiteAgregadoEventPublisher } from '../../events/publishers/staff-deporitvo/tramite-agregado.event-publisher';
import { SalarioEmpleadoModificadoEventPublisher } from '../../events/publishers/staff-deporitvo/salario-empleado-modificado.event-publisher';
import { EmpleadoDomainEntity } from '../../entities/empleado/EmpleadoDomainEntity';
import { TramiteDomainEntity } from '../../entities/tramite/tramite.entity.interface';
import { FechaTramiteModificadaEventPublisher } from '../../events/publishers/staff-deporitvo/fecha-tramite-modificada.event-publisher';
import { EmpleadoBuscadoEventPublisher } from '../../events/publishers/staff-deporitvo/empleado-buscado.event-publisher';
import { TramiteBuscadoEventPublisher } from '../../events/publishers/staff-deporitvo/tramite-buscado.event-publisher';
import { NegociacionDomainEntity } from '../../entities';
import { StateModificadoEventPublisher } from '../../events/publishers/cesion/state-modificado.event-publisher';
import { CrearStaffDeportivoHelper } from '../helpers/crear-staff-deportivo-de-staff-deportivo/crear-staff-deportivo.helper';
import { CrearTramiteHelper } from '../helpers/crear-tramite-de-staff-deportivo/crear-tramite.helper';
import { CrearEmpleadoHelper } from '../helpers/crear-empleado-de-staff-deportivo/crear-empleado.helper';
import { ModificarNombreEmpleadoHelper } from '../helpers/modificar-nombre-empleado-de-staff-deportivo/modificar-nombre-empleado.helper';
import { ModificarDocumentoEmpleadoHelper } from '../helpers/modificar-documento-empleado-de-staff-deportivo/modificar-documento-empleado.helper';
import { ModificarSalarioEmpleadoHelper } from '../helpers/modificar-salario-empleado-de-staff-deportivo/modificar-salario-empleado.helper';
import { ModificarTipoEmpleadoHelper } from '../helpers/modificar-tipo-empleado-de-staff-deportivo/modificar-tipo-empleado.helper';
import { ModificarFechaTramiteHelper } from '../helpers/modificar-fecha-de-staff-deportivo/modificar-fecha-de-tramite.helper';
import { BuscarTramiteHelper } from '../helpers/buscar-tramite-de-staff-deportivo/buscar-tramite.helper';
import { BuscarEmpleadoHelper } from '../helpers/buscar-empleado-de-staff-deportivo/buscar-empleado.helper';
import { ModificarTipoNegociacionHelper } from '../helpers/modificar-tipo-de-negociacion-de-negociacion/modificar-tipo-negociacion.helper';
import { ModificarEquipoNuevoDeNegociacionHelper } from '../helpers/modificar-equipo-nuevo-de-negociacion/modificar-equipo-nuevo-de-negociacion.helper';
import { ModificarEquipoSalidaDeNegociacionHelper } from '../helpers/modificar-equipo-salida-de-negociacion/modificar-equipo-salida.helper';
import { ModificarStateDeNegociacionHelper } from '../helpers/modificar-state-de-negociacion/modificar-state-de-negociacion.helper';
import { NombreModificadoEventPublisher, DocumentoModificadoEventPublisher, TipoEmpleadoModificadoEventPublisher, SalarioModificadoEventPublisher } from '../../events/publishers';
import { EquipoNuevoNegociacionModificadoEventPublisher, EquipoSalidaNegociacionModificadoEventPublisher, TipoDeNegociacionModificadoEventPublisher } from '../../events/publishers/negociacion';

export class StaffDeportivoAggregate implements IStaffDeportivoDomainService  , ITramiteDomainService , IEmpleadoDomainService,INegociacionDomainService{
    //Service
    private readonly staffDeportivoService?: IStaffDeportivoDomainService;

    private readonly empleadoService?: IEmpleadoDomainService;
    private readonly negociacionService?: INegociacionDomainService;
    private readonly tramiteService?: ITramiteDomainService;

    //Events
    //directiva
    private readonly staffDeportivoCreadoEvent?: StaffDeportivoCreadoEventPublisher;
    

    //empleado
    private readonly empleadoAgregadoEvent?: EmpleadoAgregadoEventPublisher;
    private readonly salarioEmpleadoModificadoEvent?: SalarioEmpleadoModificadoEventPublisher;
    private readonly empleadoBuscadoEvent?: EmpleadoBuscadoEventPublisher;
    private readonly nombremodificadoEvent?: NombreModificadoEventPublisher;
    private readonly documentoModificadoEvent?: DocumentoModificadoEventPublisher;
    private readonly tipoEmpleadoModificadoEvent?: TipoEmpleadoModificadoEventPublisher;
    private readonly salarioModificadoEvent?: SalarioModificadoEventPublisher;
   

    //tramite
    private readonly tamiteAgregadoEvent?: TramiteAgregadoEventPublisher;
    private readonly fechaTamiteModificadoEvent?: FechaTramiteModificadaEventPublisher;
    private readonly tramiteBuscadoEvent?: TramiteBuscadoEventPublisher;

    //negociacion
    private readonly negociacionEquipoNuevoModificadoEvent?: EquipoNuevoNegociacionModificadoEventPublisher;
    private readonly negociacionEquipoSalidaModificadoEvent?: EquipoSalidaNegociacionModificadoEventPublisher;
    private readonly negociacionStateModificadoEvent?: StateModificadoEventPublisher;
    private readonly negociacionTipoNegociacionModificadoEvent?: TipoDeNegociacionModificadoEventPublisher;



    constructor(
        {
            //services
            staffDeportivoService,

            empleadoService,
            negociacionService,
            tramiteService,
            //events
            staffDeportivoCreadoEvent,
           // staffDeportivoModificadaEvent,

           //empleado
            empleadoAgregadoEvent,
            salarioEmpleadoModificadoEvent,
            empleadoBuscadoEvent,
            nombreModificadoEvent,
            documentoModificadoEvent,
            tipoEmpleadoModificadoEvent,
            //tramite
            tramiteBuscadoEvent,
            tamiteAgregadoEvent,
            fechaTamiteModificadoEvent,
            
            //negociacion
            negociacionEquipoNuevoModificadoEvent,
            negociacionEquipoSalidaModificadoEvent,
            negociacionStateModificadoEvent,
            negociacionTipoNegociacionModificadoEvent,

        }: {
            //services
            staffDeportivoService?: IStaffDeportivoDomainService;
            empleadoService?: IEmpleadoDomainService;
            negociacionService?: INegociacionDomainService;
            tramiteService?: ITramiteDomainService;
            //events
            staffDeportivoCreadoEvent?: StaffDeportivoCreadoEventPublisher;
           // directivaModificadaEvent?: StaffDeportivoModificadoEventPublisher,
           empleadoAgregadoEvent?: EmpleadoAgregadoEventPublisher;
           salarioEmpleadoModificadoEvent?: SalarioEmpleadoModificadoEventPublisher;
           empleadoBuscadoEvent?: EmpleadoBuscadoEventPublisher;
           nombreModificadoEvent?: NombreModificadoEventPublisher;
           documentoModificadoEvent?: DocumentoModificadoEventPublisher;
           tipoEmpleadoModificadoEvent?: TipoEmpleadoModificadoEventPublisher;

           //tramite
            tamiteAgregadoEvent?: TramiteAgregadoEventPublisher;
            fechaTamiteModificadoEvent?: FechaTramiteModificadaEventPublisher;
            tramiteBuscadoEvent?: TramiteBuscadoEventPublisher;

            //negociacion
            negociacionEquipoNuevoModificadoEvent?: EquipoNuevoNegociacionModificadoEventPublisher;
            negociacionEquipoSalidaModificadoEvent?: EquipoSalidaNegociacionModificadoEventPublisher;
            negociacionStateModificadoEvent?: StateModificadoEventPublisher;
            negociacionTipoNegociacionModificadoEvent?: TipoDeNegociacionModificadoEventPublisher;
        }
    ) {
        //services
        this.staffDeportivoService = staffDeportivoService;

        this.empleadoService = empleadoService;
        //this.negociacionService = negociacionService,
        this.tramiteService = tramiteService;
        //events
       // this.directivaCreadaEvent = directivaCreadaEvent,
       this.staffDeportivoCreadoEvent = staffDeportivoCreadoEvent;
        //empleado
        this.empleadoAgregadoEvent = empleadoAgregadoEvent;
        this.salarioEmpleadoModificadoEvent = salarioEmpleadoModificadoEvent;
        this.empleadoBuscadoEvent = empleadoBuscadoEvent;
        this.nombremodificadoEvent = nombreModificadoEvent;
        this.documentoModificadoEvent = documentoModificadoEvent;
        this.tipoEmpleadoModificadoEvent = tipoEmpleadoModificadoEvent;
        //tramite
        this.tamiteAgregadoEvent = tamiteAgregadoEvent;
        this.fechaTamiteModificadoEvent = fechaTamiteModificadoEvent;
        this.empleadoBuscadoEvent = empleadoBuscadoEvent;

        //negociacion
        this.negociacionEquipoNuevoModificadoEvent = negociacionEquipoNuevoModificadoEvent;
        this.negociacionEquipoSalidaModificadoEvent = negociacionEquipoSalidaModificadoEvent;
        this.negociacionStateModificadoEvent = negociacionStateModificadoEvent;
        this.negociacionTipoNegociacionModificadoEvent = negociacionTipoNegociacionModificadoEvent;
    }


  
    
     CrearStaffDeportivo(staffDeportivo: StaffDeportivoDomainEntity): Promise<StaffDeportivoDomainEntity> {
       return CrearStaffDeportivoHelper(staffDeportivo,this.staffDeportivoService,this.staffDeportivoCreadoEvent);
    }

     CrearTramite(tramite: TramiteDomainEntity): Promise<TramiteDomainEntity> {
       return CrearTramiteHelper(tramite,this.tramiteService,this.tamiteAgregadoEvent)
    }


     AgregarEmpleado(empleado: EmpleadoDomainEntity): Promise<EmpleadoDomainEntity> {
        return CrearEmpleadoHelper(empleado,this.empleadoService,this.empleadoAgregadoEvent)
    }

     modificarNombre(empleadoId:string ,entity: EmpleadoDomainEntity): Promise<EmpleadoDomainEntity> {
        return ModificarNombreEmpleadoHelper(empleadoId,entity,this.empleadoService,this.nombremodificadoEvent)

    }


     modificarSalario(empleadoId:string ,entity: EmpleadoDomainEntity): Promise<EmpleadoDomainEntity> {
        return ModificarSalarioEmpleadoHelper(empleadoId,entity,this.empleadoService,this.salarioModificadoEvent)

    }
     modificarDocumento(empleadoId:string ,entity: EmpleadoDomainEntity): Promise<EmpleadoDomainEntity> {

        return ModificarDocumentoEmpleadoHelper(empleadoId,entity,this.empleadoService,this.documentoModificadoEvent)

    }
     modificarTipoEmpleado(empleadoId:string ,entity: EmpleadoDomainEntity): Promise<EmpleadoDomainEntity> {
        return ModificarTipoEmpleadoHelper(empleadoId,entity,this.empleadoService,this.tipoEmpleadoModificadoEvent)

    }

    CrearNegociacion(negociacion: TramiteDomainEntity): Promise<TramiteDomainEntity> {
        throw new Error('Method not implemented.');
    }

     ModificarFecha(tramiteId:string,entity: TramiteDomainEntity): Promise<TramiteDomainEntity> {
        return ModificarFechaTramiteHelper(tramiteId,entity,this.tramiteService,this.fechaTamiteModificadoEvent)

    }

    
     BuscarTramite(tramiteId: string):Promise<TramiteDomainEntity>{
        return BuscarTramiteHelper(tramiteId,this.tramiteService,this.tramiteBuscadoEvent)

    }

     BuscarEmpleado(empleadoId: string):Promise<EmpleadoDomainEntity>{
        return BuscarEmpleadoHelper(empleadoId,this.empleadoService,this.empleadoBuscadoEvent)

    }

     NegociacionModificarEquipoNuevo(negociacionId:string ,entity: NegociacionDomainEntity): Promise<NegociacionDomainEntity> {
        return ModificarEquipoNuevoDeNegociacionHelper(negociacionId,entity,this.negociacionService,this.negociacionEquipoNuevoModificadoEvent)
        
    }
    
     NegociacionModificarEquipoSalida(negociacionId:string ,entity: NegociacionDomainEntity): Promise<NegociacionDomainEntity> {
        return ModificarEquipoSalidaDeNegociacionHelper(negociacionId,entity,this.negociacionService,this.negociacionEquipoSalidaModificadoEvent)

    }
     NegociacionModificarState(negociacionId:string ,entity: NegociacionDomainEntity): Promise<NegociacionDomainEntity> {
        return ModificarStateDeNegociacionHelper(negociacionId,entity,this.negociacionService,this.negociacionStateModificadoEvent)
        
    }
     NegociacionModificarTipoNegociacion(negociacionId:string ,entity: NegociacionDomainEntity): Promise<NegociacionDomainEntity> {
        return ModificarTipoNegociacionHelper(negociacionId,entity,this.negociacionService,this.negociacionTipoNegociacionModificadoEvent)

    }


   
}

   

   

 
    
 
    

