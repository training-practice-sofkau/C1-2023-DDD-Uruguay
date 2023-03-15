import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { ObtenerClienteUseCase } from "./obtener-cliente.use-case";
import { ObtenerPlanUseCase } from "./obtener-plan.use-case";
import { MembershipAggregate, IMembershipService, IMembershipDomainEntityInterface, MembershipDomainEntity } from "../../../domain";
import { MembershipCreadaEventPublisher } from "../../../domain/events/publishers/membership";
import { ICreateMembershipMethod } from "../../../domain/interfaces/commands/membership";
import { IMembresiaCreadaResponse } from "../../../domain/interfaces/responses/membership";

export class CreateMembershipUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends ICreateMembershipMethod = ICreateMembershipMethod,
    Response extends IMembresiaCreadaResponse = IMembresiaCreadaResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT 
    //Y LOS CASOS DE USO QUE EJECUTAN EL METODO QUE ME PERMITE OBTENER LAS ENTIDADES
    private readonly membershipAggregate: MembershipAggregate
    private readonly obtenerClienteUseCase: ObtenerClienteUseCase
    private readonly ObtenerPlanUseCase: ObtenerPlanUseCase


    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly membershipService: IMembershipService,
        private readonly membershipCreadaEventPublisher: MembershipCreadaEventPublisher) {
        super();
        this.membershipAggregate = new MembershipAggregate({ membershipService, membershipCreadaEventPublisher })
    }

    /*
    ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
    "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
    ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
    */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeMembershipAggregate(command)

        return { success: data ? true : false, data } as unknown as Response
    }

    //METODO PARA EJECUTAR EL METODO DE MI AGREGADO
    private executeMembershipAggregate(membership: IMembershipDomainEntityInterface): Promise<MembershipDomainEntity | null> {

        return this.membershipAggregate.createMembership(membership as ICreateMembershipMethod)
    }


    private async createEntity(command: Command): Promise<MembershipDomainEntity> {
        const clienteMembership = this.obtenerClienteUseCase.execute({ idCliente: command.idCliente })
        const planMembership = this.ObtenerPlanUseCase.execute({ idPlan: command.idPlan })

        return new MembershipDomainEntity({ clienteMembership: (await clienteMembership).data, planMembership: (await planMembership).data })
    }


    async executeCommand(command: Command): Promise<MembershipDomainEntity | null> {
        const membershipEntity = this.createEntity(command);

        return this.executeMembershipAggregate(membershipEntity as MembershipDomainEntity);
    }


}
