import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ClienteDomainEntity, IClienteDomainEntityInterface, IClienteService, IClientephoneActualizadoResponse, IMembershipService, IUpdatePhoneMethod, MembershipAggregate, PhoneValueObject, UpdatePhoneEventPublisher } from "../../../domain";

export class UpdateClientPhoneUseCase <

//MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
Command extends IUpdatePhoneMethod = IUpdatePhoneMethod,
Response extends IClientephoneActualizadoResponse = IClientephoneActualizadoResponse>

extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

//LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
private readonly membershipAggregate: MembershipAggregate

//INYECTO EL SERVICIO Y EL EVENTO NECESARIO
constructor(
    private readonly clienteService: IClienteService,
    private readonly updatePhoneEventPublisher: UpdatePhoneEventPublisher) {
    super();
    this.membershipAggregate = new MembershipAggregate({ clienteService, updatePhoneEventPublisher })
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
private executeMembershipAggregate(data: IClienteDomainEntityInterface): Promise<ClienteDomainEntity | null> {
    return this.membershipAggregate.updatePhone(data as IUpdatePhoneMethod)
}

//TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
private createValueObject(command: Command): IClienteDomainEntityInterface {

    const phoneCliente = new PhoneValueObject(command.phoneCliente);

    return { phoneCliente }
}

//VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
private validateValueObject(valueObject: IClienteDomainEntityInterface): void {
    const {  phoneCliente  } = valueObject


    if (phoneCliente instanceof PhoneValueObject && phoneCliente.hasErrors())
        this.setErrors(phoneCliente.getErrors());


    if (this.hasErrors() === true)
        throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-cliente.use-case',
            this.getErrors(),
        );
}

private createEntity(valueObject: IClienteDomainEntityInterface): ClienteDomainEntity {
    const { phoneCliente, idCliente } = valueObject

    return new ClienteDomainEntity({idCliente : idCliente.valueOf(), phoneCliente: phoneCliente.valueOf()})
}


async executeCommand(command: Command): Promise<ClienteDomainEntity | null> {

    const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
    this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
    const cliente = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

    return this.executeMembershipAggregate(cliente);
}



}

