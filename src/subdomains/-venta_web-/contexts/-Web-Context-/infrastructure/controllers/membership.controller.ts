import { Body, Controller, Post } from '@nestjs/common';
import { CreateClienteCommand } from '../utils/commands/createCliente.command';
import {  CreateCursoUseCase, ObtenerClienteUseCase, ObtenerCursoUseCase,  UpdateCursoCostoUseCase } from '../../application/use-cases/compra';
import { ClienteCreadoEventPublisher } from '../../domain/events/publishers/compra/cliente-creado.event-publisher';
import { ICompraService } from '../../domain/services/compra.service';
import { ICreateCompraCommand } from '../utils/commands/compra/createCompra.command';
import { CompraCreadaEventPublisher } from '../../domain/events/publishers/compra/compra-creada.event-publisher';
import { IClienteService } from '../../domain/services/cliente.service';
import { ICursoService } from '../../domain/services/curso.service';
import { CursoCreadoEventPublisher } from '../../domain/events/publishers/compra/curso-creado.event-publisher';
import { ICreateCursoCommand } from '../utils/commands/compra/createCurso.command';
import { IUpdatePhoneCommand } from '../utils/commands/updatePhone.command';
import { UpdatePhoneEventPublisher } from '../../domain/events/publishers/compra/cliente/update-phone.event-publisher';
import { IUpdateCostoCommand } from '../utils/commands/compra/curso/updateCosto.command';
import { UpdateCostoCursoEventPublisher } from '../../domain/events/publishers/compra/curso/update-costo.event-publisher';
import { CursoConseguidoEventPublisher } from '../../domain/events/publishers/compra/curso/curso-conseguido.event-publisher';
import { IObtenerCursoCommand } from '../utils/commands/compra/curso/obtenerCurso.command';
import { IObtenerClienteCommand } from '../utils/commands/ObtenerCliente.command';
import { ClienteConseguidoEventPublisher } from '../../domain/events/publishers/compra/cliente/cliente-conseguido.event-publisher';
import { CreateClienteUseCase } from '../../application/use-cases/membership/create-cliente.use-case';
import { IMembershipService } from '../../domain/services/membership.service';
import { ICreatePlanCommand } from '../utils/commands/membership/createPlan.command';
import { ObtenerPlanUseCase } from '../../application/use-cases/membership/obtener-plan.use-case';
import { CreatePlanUseCase } from '../../application/use-cases/membership/create-plan.use-case';
import { IPlanService } from '../../domain/services/plan.service';
import { PlanCreadoEventPublisher } from '../../domain/events/publishers/membership/plan-creado.event-publisher';
import { UpdateClientPhoneUseCase } from '../../application/use-cases/membership/update-client-phone.use-case';
import { ICreateMembershipCommand } from '../utils/commands/membership/createMembership.command';
import { CreateMembershipUseCase } from '../../application/use-cases/membership/create-membership.use-case';
import { MembershipCreadaEventPublisher } from '../../domain/events/publishers/membership/membresia-creada.event-publisher';

@Controller('membership')
export class MembershipController {


    constructor(
        private readonly membershipService: IMembershipService,
        private readonly membershipCreadaEventPublisher : MembershipCreadaEventPublisher,

        private readonly clienteService: IClienteService,
        private readonly clienteCreadoEventPublisher: ClienteCreadoEventPublisher,
        private readonly updatePhoneEventPublisher: UpdatePhoneEventPublisher,
        private readonly clienteConseguidoEventPublisher: ClienteConseguidoEventPublisher,

        private readonly planService: IPlanService,
        private readonly planCreadoEventPublisher: PlanCreadoEventPublisher

        
    ) {}


    //CREATES
    
    @Post('/crear-cliente')
    async crearCliente(@Body() command: CreateClienteCommand) {
        const useCase = new CreateClienteUseCase(
            this.clienteService,
            this.clienteCreadoEventPublisher,
        );
        return await useCase.execute(command);
    }
 
    @Post('/crear-plan')
    async crearPlan(@Body() command: ICreatePlanCommand ) {
        const useCase = new CreatePlanUseCase(
            this.planService,
            this.planCreadoEventPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-membership')
    async crearMembership(@Body() command: ICreateMembershipCommand ) {
        const useCase = new CreateMembershipUseCase(
            this.membershipService,
            this.membershipCreadaEventPublisher,
        );
        return await useCase.execute(command);
    }

    //UPDATES

    @Post('/update-phone')
    async updatePhoneCliente(@Body() command: IUpdatePhoneCommand ) {
        const useCase = new UpdateClientPhoneUseCase(
            this.clienteService,
            this.updatePhoneEventPublisher,
        );
        return await useCase.execute(command);
    }

    //OBTENER

    @Post('/obtener-cliente')
    async obtenerCliente(@Body() command: IObtenerClienteCommand ) {
        const useCase = new  ObtenerClienteUseCase(
            this.clienteService,
            this.clienteConseguidoEventPublisher,
        );
        return await useCase.execute(command);
    }
    
    
}