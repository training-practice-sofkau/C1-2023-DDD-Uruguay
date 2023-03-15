import { Body, Controller, Post, Get } from '@nestjs/common';
import { DocumentoModificadoEventPublisher, EmpleadoBuscadoEventPublisher, SalarioModificadoEventPublisher, TipoEmpleadoModificadoEventPublisher, TramiteBuscadoEventPublisher } from '../../domain/events/publishers';
import { EmpleadoService } from '../persistence/services/empleado.service';
import { EmpleadoAgregadoEventPublisher } from '../../domain/events/publishers/staff-deporitvo/empleado-agregado.event-publisher';
import { NombreModificadoEventPublisher } from '../../domain/events/publishers/empleado/nombre-modificado.event-publisher';
import { AgregarEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/agregar-empleado.commands';
import { CrearEmpleadoUseCase } from '../../application/use-cases/staff-deportivo/crear-empleado.use-case';
import { BuscarEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/buscar-empleado.commands';
import { BuscarEmpleadoUseCase } from '../../application/use-cases/staff-deportivo/buscar-empleado.use-case';
import { ModificarNombreEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/modificar-nombre-empleado.commands';
import { ModificarTipoEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/modificar-tipo-empleado.commands';
import { ModificarDocumentoEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/modificar-documento-empleado.commands';
import { ModificarSalarioEmpleadoCommand } from '../utils/commands/staffDeportivo/empleado/modificar-salario-empleado.commands';
import { ModificarNombreEmpleadoUseCase } from '../../application/use-cases/staff-deportivo/modificar-nombre-empleado.case-use';
import { ModificarDocumentoEmpleadoUseCase, ModificarSalarioEmpleadoUseCase, ModificarTipoEmpleadoUseCase } from '../../application';
import { AgregarEmpleadoPublisher } from '../messaging/publishers/staffDeportivo/empleado/agregar-empleado.publisher';
import { BuscarEmpleadoPublisher, ModificarSalarioEmpleadoPublisher } from '../messaging';
import { ModificarNombreEmpleadoPublisher } from '../messaging/publishers/staffDeportivo/empleado/modificar-nombre-empleado.publisher';
import { ModificarDocumentoEmpleadoPublisher } from '../messaging/publishers/staffDeportivo/empleado/modificar-documento-empleado.publisher';
import { ModificarTipoEmpleadoPublisher } from '../messaging/publishers/staffDeportivo/empleado/modificar-tipo-empleado.publisher';

@Controller('empleado')
export class EmpleadoController {
    
    constructor(
        private readonly empleadoService: EmpleadoService,

        private readonly empleadoAgregadoEventPublisher: AgregarEmpleadoPublisher,

        private readonly empleadoBuscadoEven: BuscarEmpleadoPublisher,
        private readonly nombreModificadoEvent: ModificarNombreEmpleadoPublisher,
        private readonly documentoModificadoEvent: ModificarDocumentoEmpleadoPublisher,
        private readonly tipoEmpleadoModificadoEvent: ModificarTipoEmpleadoPublisher,
        private readonly salarioModificadoEvent: ModificarSalarioEmpleadoPublisher,
    ) {}

    @Post('/agregar')
    async agregarEmpleado(@Body() command: AgregarEmpleadoCommand) {
        const useCase = new CrearEmpleadoUseCase(
            this.empleadoService,
            this.empleadoAgregadoEventPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/modificar-agregar')
    async modificarNombreEmpleado(@Body() command: ModificarNombreEmpleadoCommand) {
        const useCase = new ModificarNombreEmpleadoUseCase(
            this.empleadoService,
            this.nombreModificadoEvent,
        );
        return await useCase.execute(command);
    }
    @Post('/modificar-documento')
    async modificarDocumentoEmpleado(@Body() command: ModificarDocumentoEmpleadoCommand) {
        const useCase = new ModificarDocumentoEmpleadoUseCase(
            this.empleadoService,
            this.documentoModificadoEvent,
        );
        return await useCase.execute(command);
    }
    
    @Post('/modificar-tipo')
    async modificarTipoEmpleado(@Body() command: ModificarTipoEmpleadoCommand) {
        const useCase = new ModificarTipoEmpleadoUseCase(
            this.empleadoService,
            this.tipoEmpleadoModificadoEvent,
        );
        return await useCase.execute(command);
    }

    @Post('/modificar-salario')
    async modificarSalarioEmpleado(@Body() command: ModificarSalarioEmpleadoCommand) {
        const useCase = new ModificarSalarioEmpleadoUseCase(
            this.empleadoService,
            this.salarioModificadoEvent,
        );
        return await useCase.execute(command);
    }



    @Get('/buscar')
    async buscarEmpleado(@Body() command: BuscarEmpleadoCommand) {
        const useCase = new BuscarEmpleadoUseCase(
            this.empleadoService,
            this.empleadoBuscadoEven,
        );
        return await useCase.execute(command);
    }

  
}
