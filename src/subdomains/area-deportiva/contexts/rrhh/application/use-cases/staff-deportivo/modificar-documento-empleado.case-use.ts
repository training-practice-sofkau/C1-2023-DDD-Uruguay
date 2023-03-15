import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";

import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { EmpleadoDomainEntity, IEmpleadoDomainEntity } from "../../../domain/entities";
import { DocumentoModificadoEventPublisher } from "../../../domain/events/publishers";
import { IModificarDocumentoCommands } from "../../../domain/interfaces/commands/empleado";
import { IDocumentoModificadoResponse } from "../../../domain/interfaces/responses/empleado";
import { IdValueObject, DocumentoValueObject } from "../../../domain/value-objects";
import { IEmpleadoDomainService } from '../../../domain/services/staff-Deportivo/empleado.domain-service';

export class ModificarDocumentoEmpleadoUseCase 
    extends ValueObjectErrorHandler
    implements IUseCase<IModificarDocumentoCommands, IDocumentoModificadoResponse> {
        
        private readonly aggregateRoot:StaffDeportivoAggregate;

        constructor(
            private readonly empleadoService: IEmpleadoDomainService,
            private readonly documentoModificadoEvent : DocumentoModificadoEventPublisher,
        ){
            super();
            this.aggregateRoot = new StaffDeportivoAggregate({empleadoService,documentoModificadoEvent});
        }
   

    async execute(command?: IModificarDocumentoCommands): Promise<IDocumentoModificadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IModificarDocumentoCommands): Promise<EmpleadoDomainEntity | null> {

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
    private createValueObject(command: IModificarDocumentoCommands): IEmpleadoDomainEntity {

        
        const empleadoId = new IdValueObject(command.empleadoid);
        const documento= new DocumentoValueObject(command.documento);

        return {
            empleadoId,
            documento,
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: IEmpleadoDomainEntity): void {

        const {
            documento,
        } = valueObject

        if (documento instanceof DocumentoValueObject && documento.hasErrors())
            this.setErrors(documento.getErrors());


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
            documento,
            
        } = valueObject

        return new EmpleadoDomainEntity({
            empleadoId : empleadoId.valueOf(),
            documento: documento.valueOf(),
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueOrderAggregateRoot(
        entity: EmpleadoDomainEntity,
    ): Promise<EmpleadoDomainEntity | null> {
        return this.aggregateRoot.modificarDocumento(entity.empleadoId.valueOf(),entity)
    }
}
