import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { EmpleadoBuscadoEventPublisher } from "../../../domain/events/publishers/staff-deporitvo/empleado-buscado.event-publisher";
import { TipoEmpleadoModificadoEventPublisher } from '../../../domain/events/publishers/empleado/tipo-empleado-modificado';
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { EmpleadoDomainEntity, IEmpleadoDomainEntity } from "../../../domain/entities";
import { IModificarSalarioEmpleadoCommands } from "../../../domain/interfaces/commands/staff-deportivo";
import { ISalarioEmpleadoModificadoResponse } from "../../../domain/interfaces/responses/staff-deportivo";
import { IdValueObject, CostoValueObject } from "../../../domain/value-objects";
import { IEmpleadoDomainService } from '../../../domain/services/staff-Deportivo/empleado.domain-service';

export class ModificarSalarioEmpleadoUseCase 
    extends ValueObjectErrorHandler
    implements IUseCase<IModificarSalarioEmpleadoCommands, ISalarioEmpleadoModificadoResponse> {
        
        private readonly aggregateRoot:StaffDeportivoAggregate;

        constructor(
            private readonly empleadoService: IEmpleadoDomainService,
            private readonly tipoEmpleadoModificadoEvent : TipoEmpleadoModificadoEventPublisher,
        ){
            super();
            this.aggregateRoot = new StaffDeportivoAggregate({empleadoService,tipoEmpleadoModificadoEvent});
        }
   

    async execute(command?: IModificarSalarioEmpleadoCommands): Promise<ISalarioEmpleadoModificadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IModificarSalarioEmpleadoCommands): Promise<EmpleadoDomainEntity | null> {

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
    private createValueObject(command: IModificarSalarioEmpleadoCommands): IEmpleadoDomainEntity {

        
        const empleadoId = new IdValueObject(command.empleadoId);
        const salario = new CostoValueObject(command.salario);

        return {
            empleadoId,
            salario,
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: IEmpleadoDomainEntity): void {

        const {
            salario,
        } = valueObject

        if ( salario instanceof CostoValueObject && salario.hasErrors())
            this.setErrors(salario.getErrors());

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
            salario,
            
        } = valueObject

        return new EmpleadoDomainEntity({
            empleadoId : empleadoId.valueOf(),
            salario: salario.valueOf(),
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueOrderAggregateRoot(
        entity: EmpleadoDomainEntity,
    ): Promise<EmpleadoDomainEntity | null> {
        return this.aggregateRoot.modificarSalario(entity.empleadoId.valueOf(),entity)
    }
}
