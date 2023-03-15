import { Body, Controller, Post } from '@nestjs/common';
import { StaffDeportivoService } from '../persistence/services/staff-deportivo.service';
import { StaffDeportivoCreadoEventPublisher } from '../../domain/events/publishers/staff-deporitvo/staff-depotivo-creado.event-publisher';
import { CrearStaffDeportivoUseCase } from '../../application/use-cases/staff-deportivo/crear-staff-deportivo.use.case';
import { CrearStaffDeportivoCommand } from '../utils/commands/staffDeportivo/crear-staff-deportivo.commands';
import { EmpleadoBuscadoEventPublisher, TramiteBuscadoEventPublisher } from '../../domain/events/publishers';
import { EmpleadoService } from '../persistence/services/empleado.service';
import { TramiteService } from '../persistence/services/tramite.service';
import { CrearStaffDeportivoPublisher } from '../messaging/publishers/staffDeportivo/crear-staff-deportivo.publisher';
import { BuscarTramitePublisher } from '../messaging/publishers/staffDeportivo/tramite/buscar-tramite.publisher';
import { BuscarEmpleadoPublisher } from '../messaging';

@Controller('staffDeportivo')
export class StaffDeportivoController {
    constructor(
        private readonly staffDeportivoService: StaffDeportivoService,
        private readonly empleadoService: EmpleadoService,
        private readonly tramiteService: TramiteService,

        private readonly staffDeportivoCreadoEventPublisher: CrearStaffDeportivoPublisher,
        private readonly tramiteBuscadoEvent : BuscarTramitePublisher,
        private readonly empleadoBuscadoEvent : BuscarEmpleadoPublisher,
    ) {}

    @Post('/crear')
    async crearStaffDeportivo(@Body() command: CrearStaffDeportivoCommand) {
        const useCase = new CrearStaffDeportivoUseCase(
            this.staffDeportivoService,
            this.empleadoService,
            this.tramiteService,
            this.staffDeportivoCreadoEventPublisher,
            this.tramiteBuscadoEvent,
            this.empleadoBuscadoEvent
        );
        return await useCase.execute(command);
    }

  
}
