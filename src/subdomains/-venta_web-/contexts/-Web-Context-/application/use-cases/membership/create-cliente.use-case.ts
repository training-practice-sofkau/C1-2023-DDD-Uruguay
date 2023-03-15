import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ICreateClienteMethod } from "../../../domain/interfaces/commands";
import { IClienteCreadoResponse } from "../../../domain/interfaces/responses";
import { ClienteCreadoEventPublisher, ClienteDomainEntity, IClienteDomainEntityInterface, IClienteService, IMembershipService, MembershipAggregate } from "../../../domain";
import { FullnameValueObject } from "../../../domain/value-objects/common-value-objects/fullname";
import { PhoneValueObject } from "../../../domain/value-objects/cliente/phone/phone.value-object";
import { EmailValueObject } from "../../../domain/value-objects/cliente/email/email.value-object";

export class CreateClienteUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends ICreateClienteMethod = ICreateClienteMethod,
    Response extends IClienteCreadoResponse = IClienteCreadoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly membershipAggregate: MembershipAggregate

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly clienteService: IClienteService,
        private readonly clienteCreadoEventPublisher: ClienteCreadoEventPublisher) {
        super();
        this.membershipAggregate = new MembershipAggregate({ clienteService, clienteCreadoEventPublisher })
    }

    /*
    Una función asíncrona es una función que devuelve una Promesa y puede
    utilizar la palabra clave await para esperar a que se resuelva la Promesa
    antes de continuar con la ejecución del código.
    */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeMembershipAggregate(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    //METODO PARA EJECUTAR EL METODO DE MI AGREGADO
    private executeMembershipAggregate(cliente: IClienteDomainEntityInterface): Promise<ClienteDomainEntity | null> {
        return this.membershipAggregate.createCliente(cliente as ICreateClienteMethod)
    }

    //TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
    private createValueObject(command: Command): IClienteDomainEntityInterface {

        const nombreCliente = new FullnameValueObject(command.nombreCliente);
        const phoneCliente = new PhoneValueObject(command.phoneCliente);
        const emailCliente = new EmailValueObject(command.emailCliente);

        return { nombreCliente, phoneCliente, emailCliente }
    }

    //VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
    private validateValueObject(valueObject: IClienteDomainEntityInterface): void {
        const { nombreCliente, phoneCliente, emailCliente } = valueObject

        if (nombreCliente instanceof FullnameValueObject && nombreCliente.hasErrors())
            this.setErrors(nombreCliente.getErrors());

        if (phoneCliente instanceof PhoneValueObject && phoneCliente.hasErrors())
            this.setErrors(phoneCliente.getErrors());

        if (emailCliente instanceof EmailValueObject && emailCliente.hasErrors())
            this.setErrors(emailCliente.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-cliente.use-case',
                this.getErrors(),
            );
    }

    private createEntity(valueObject: IClienteDomainEntityInterface): ClienteDomainEntity {
        const { nombreCliente, phoneCliente, emailCliente } = valueObject

        return new ClienteDomainEntity({ nombreCliente: nombreCliente, phoneCliente: phoneCliente, emailCliente: emailCliente })
    }


    async executeCommand(command: Command): Promise<ClienteDomainEntity | null> {

        const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
        this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
        const cliente = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

        return this.executeMembershipAggregate(cliente);
    }
}
