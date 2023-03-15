import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { NombreModificadoEventPublisher } from '../../../domain/events/publishers/empleado/nombre-modificado.event-publisher';
import { IModificarNombreCommands } from '../../../domain/interfaces/commands/empleado/modificar-nombre.commands';
import { EmpleadoBuscadoEventPublisher } from "../../../domain/events/publishers/staff-deporitvo/empleado-buscado.event-publisher";
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { EmpleadoDomainEntity, IEmpleadoDomainEntity } from "../../../domain/entities";
import { INombreModificadoResponse } from "../../../domain/interfaces/responses/empleado";
import { IdValueObject, NombreValueObject } from "../../../domain/value-objects";
import { IEmpleadoDomainService } from '../../../domain/services/staff-Deportivo/empleado.domain-service';

export class ModificarNombreEmpleadoUseCase 
    extends ValueObjectErrorHandler
    implements IUseCase<IModificarNombreCommands, INombreModificadoResponse> {
        
        private readonly aggregateRoot:StaffDeportivoAggregate;

        constructor(
            private readonly empleadoService: IEmpleadoDomainService,
            private readonly nombreModificadoEvent : NombreModificadoEventPublisher,
        ){
            super();
            this.aggregateRoot = new StaffDeportivoAggregate({empleadoService,nombreModificadoEvent,});
        }
   

    async execute(command?: IModificarNombreCommands): Promise<INombreModificadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IModificarNombreCommands): Promise<EmpleadoDomainEntity | null> {

        //Llamada a la funcion que crea lso value object 
        const ValueObject = this.createValueObject(command);

        //Llama para validar los value object 
        this.validateValueObject(ValueObject);

        //Llama a la funcion para crear la entidad que se necesita pasandole los value object 
        const entity = this.createEntityClientDomain(ValueObject);

        //Llama a la funcion que se conecta con el servicio del agregado 
        return this.exectueOrderAggregateRoot(entity)
    }

    //Crea los value Object 
    private createValueObject(command: IModificarNombreCommands): IEmpleadoDomainEntity {

        
        const empleadoId = new IdValueObject(command.empleadoid);
        const nombre= new NombreValueObject(command.nombre);

        return {
            empleadoId,
            nombre,
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: IEmpleadoDomainEntity): void {

        const {
            nombre,
        } = valueObject

        if ( nombre instanceof NombreValueObject && nombre.hasErrors())
            this.setErrors(nombre.getErrors());


        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado por AddClientUseCase',
                this.getErrors(),
            );

    }

    //Crea la entidad en si
    private createEntityClientDomain(
        valueObject: IEmpleadoDomainEntity
    ): EmpleadoDomainEntity {

        const {
            empleadoId,
            nombre,
            
        } = valueObject

        return new EmpleadoDomainEntity({
            empleadoId : empleadoId.valueOf(),
            nombre: nombre.valueOf(),
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueOrderAggregateRoot(
        entity: EmpleadoDomainEntity,
    ): Promise<EmpleadoDomainEntity | null> {
        return this.aggregateRoot.modificarNombre(entity.empleadoId.valueOf(),entity)
    }
}
