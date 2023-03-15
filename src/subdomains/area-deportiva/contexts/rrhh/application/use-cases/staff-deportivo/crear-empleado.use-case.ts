import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";

import { IEmpleadoAgregadoResponse } from '../../../domain/interfaces/responses/staff-deportivo/empleado-agregado.response';
import { IEmpleadoDomainEntity } from '../../../domain/entities/interfaces/empleado/empleado.domain-entity.interface';
import { DocumentoValueObject } from '../../../domain/value-objects/documento/documento.value-object';
import { TipoEmpleadoValueObject } from '../../../domain/value-objects/tipoEmpleado/tipo-empleado.value-object';
import { NacionalidadValueObject } from '../../../domain/value-objects/nacionalidad/nacionalidad.value-object';
import { EdadValueObject } from '../../../domain/value-objects/edad/edad.value-object';
import { CostoValueObject } from '../../../domain/value-objects/costo/costo.value-object';
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { EmpleadoDomainEntity } from "../../../domain/entities";
import { EmpleadoAgregadoEventPublisher } from "../../../domain/events/publishers";
import { IAgregarEmpleadoCommands } from "../../../domain/interfaces/commands/staff-deportivo";
import { IEmpleadoDomainService } from "../../../domain/services";
import { NombreValueObject } from "../../../domain/value-objects";

export class CrearEmpleadoUseCase 
    extends ValueObjectErrorHandler
    implements IUseCase<IAgregarEmpleadoCommands, IEmpleadoAgregadoResponse> {
        
        private readonly aggregateRoot:StaffDeportivoAggregate;

        constructor(
            private readonly empleadoService: IEmpleadoDomainService,
            private readonly  empleadoAgregadoEvent : EmpleadoAgregadoEventPublisher,
        ){
            super();
            this.aggregateRoot = new StaffDeportivoAggregate({empleadoService,empleadoAgregadoEvent});
        }
   
        //Ejecutar el comando , usando otra funcion para crear lo que necesita el comando 
    async execute(command?: IAgregarEmpleadoCommands): Promise<IEmpleadoAgregadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IAgregarEmpleadoCommands): Promise<EmpleadoDomainEntity | null> {

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
    private createValueObject(command: IAgregarEmpleadoCommands): IEmpleadoDomainEntity {

        const nombre= new NombreValueObject(command.nombre);
        const documento= new DocumentoValueObject(command.documento);
        const tipoEmpleado= new TipoEmpleadoValueObject(command.tipoEmpleado);
        const nacionalidad = new NacionalidadValueObject(command.nacionalidad);
        const edad  = new EdadValueObject(command.edad);
        const salario =  new CostoValueObject(command.salario);

        return {
            nombre,
            documento,
            tipoEmpleado,
            nacionalidad,
            edad,
            salario
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: IEmpleadoDomainEntity): void {

        const {
            nombre,
            documento,
            tipoEmpleado,
            nacionalidad,
            edad,
            salario
        } = valueObject

        if ( nombre instanceof NombreValueObject && nombre.hasErrors())
            this.setErrors(nombre.getErrors());

        if (documento instanceof DocumentoValueObject && documento.hasErrors())
            this.setErrors(documento.getErrors());

        if (tipoEmpleado instanceof TipoEmpleadoValueObject && tipoEmpleado.hasErrors())
        this.setErrors(tipoEmpleado.getErrors());

        if (nacionalidad instanceof NacionalidadValueObject && nacionalidad.hasErrors())
        this.setErrors(nacionalidad.getErrors());

        if (edad instanceof EdadValueObject && edad.hasErrors())
        this.setErrors(edad.getErrors());

        if (salario instanceof CostoValueObject && salario.hasErrors())
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
            nombre,
            documento,
            tipoEmpleado,
            nacionalidad,
            edad,
            salario
            
        } = valueObject

        return new EmpleadoDomainEntity({
            
            nombre: nombre.valueOf(),
            documento: documento.valueOf(),
            tipoEmpleado:tipoEmpleado.valueOf(),
            nacionalidad: nacionalidad.valueOf(),
            edad: edad.valueOf(),
            salario: salario.valueOf()
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueOrderAggregateRoot(
        entity: EmpleadoDomainEntity,
    ): Promise<EmpleadoDomainEntity | null> {
        return this.aggregateRoot.AgregarEmpleado(entity)
    }
}

