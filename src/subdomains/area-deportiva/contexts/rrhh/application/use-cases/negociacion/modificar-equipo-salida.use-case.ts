import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { NegociacionDomainEntity, INegociacionDomainEntityInterface } from "../../../domain/entities";
import { IModificarEquipoSalidaCommands } from "../../../domain/interfaces/commands/cesion";
import { IEquipoSalidaModificadoResponse } from "../../../domain/interfaces/responses/cesion";
import { IStaffDeportivoDomainService } from "../../../domain/services";
import { IdValueObject } from "../../../domain/value-objects";
import { EquipoSalidaNegociacionModificadoEventPublisher } from '../../../domain/events/publishers/negociacion/equipo-salida-modificado.event-publisher';

export class ModificarEquipoSalidaUseCase   extends ValueObjectErrorHandler
implements IUseCase<IModificarEquipoSalidaCommands, IEquipoSalidaModificadoResponse> {
    
    private readonly aggregateRoot:StaffDeportivoAggregate;

    constructor(
        private readonly staffDeportivoService: IStaffDeportivoDomainService,
        private readonly negociacionEquipoSalidaModificadoEvent : EquipoSalidaNegociacionModificadoEventPublisher,
    ){
        super();
        this.aggregateRoot = new StaffDeportivoAggregate({staffDeportivoService,negociacionEquipoSalidaModificadoEvent});
    }


    async execute(command?: IModificarEquipoSalidaCommands): Promise<IEquipoSalidaModificadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IModificarEquipoSalidaCommands): Promise<NegociacionDomainEntity | null> {

        //Llamada a la funcion que crea lso value object 
        const ValueObject = this.createValueObject(command);

        //Llama para validar los value object 
        this.validateValueObject(ValueObject);

        //Llama a la funcion para crear la entidad que se necesita pasandole los value object 
        const entity =  this.createEntityNegociacionDomain(ValueObject);

        //Llama a la funcion que se conecta con el servicio del agregado 
        return this.exectueStaffDeportivoAggregateRoot(entity)
    }

    //Crea los value Object 
    private createValueObject(command: IModificarEquipoSalidaCommands): INegociacionDomainEntityInterface {

        
        const negociacionId = new IdValueObject(command.negociacionId);
        const equipoSalidaId= new IdValueObject(command.equipoSalidaId);

        return {
            negociacionId,
            equipoSalidaId,
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: INegociacionDomainEntityInterface): void {

        const {
            negociacionId,
            equipoSalidaId,
        } = valueObject

        if (negociacionId instanceof IdValueObject && negociacionId.hasErrors())
            this.setErrors(negociacionId.getErrors());
        
        if (equipoSalidaId instanceof IdValueObject && equipoSalidaId.hasErrors())
            this.setErrors(equipoSalidaId.getErrors());


        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'Hay algunos errores en el comando ejecutado por AddClientUseCase',
                this.getErrors(),
            );

    }

    //Crea la entidad en si
    private createEntityNegociacionDomain(
        valueObject: INegociacionDomainEntityInterface
    ): NegociacionDomainEntity {

        const {
            negociacionId,
            equipoSalidaId,
            
        } = valueObject

        return new NegociacionDomainEntity({
            negociacionId : negociacionId,
            equipoSalidaId: equipoSalidaId,
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueStaffDeportivoAggregateRoot(
        entity: NegociacionDomainEntity,
    ): Promise<NegociacionDomainEntity | null> {
        return  this.aggregateRoot.NegociacionModificarEquipoSalida(entity.negociacionId.valueOf(),entity);
    }
}