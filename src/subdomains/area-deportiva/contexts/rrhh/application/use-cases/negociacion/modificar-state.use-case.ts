import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";

import { StateModificadoEventPublisher } from '../../../domain/events/publishers/cesion/state-modificado.event-publisher';
import { StateValueObject } from '../../../domain/value-objects/state/state.value-object';
import { StaffDeportivoAggregate } from "../../../domain/aggregates";
import { NegociacionDomainEntity, INegociacionDomainEntityInterface } from "../../../domain/entities";
import { IStateModificadoResponse } from "../../../domain/interfaces/responses/cesion";
import { IStaffDeportivoDomainService } from "../../../domain/services";
import { IdValueObject } from "../../../domain/value-objects";
import { IModificarStateCommands } from "../../../domain/interfaces/commands/negociacion";

export class ModificarStateUseCase   extends ValueObjectErrorHandler
implements IUseCase<IModificarStateCommands, IStateModificadoResponse> {
    
    private readonly aggregateRoot:StaffDeportivoAggregate;

    constructor(
        private readonly staffDeportivoService: IStaffDeportivoDomainService,
        private readonly negociacionStateModificadoEvent : StateModificadoEventPublisher,
    ){
        super();
        this.aggregateRoot = new StaffDeportivoAggregate({staffDeportivoService,negociacionStateModificadoEvent});
    }


    async execute(command?: IModificarStateCommands): Promise<IStateModificadoResponse> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data }
    }

    //Crea todo lo que tiene el comando con los value Object 
    private async executeCommand(command: IModificarStateCommands): Promise<NegociacionDomainEntity | null> {

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
    private createValueObject(command: IModificarStateCommands): INegociacionDomainEntityInterface {

        
        const negociacionId = new IdValueObject(command.id);
        const state= new StateValueObject(command.state);

        return {
            negociacionId,
            state,
        }
    }

    //Valida los value object
    private validateValueObject(valueObject: INegociacionDomainEntityInterface): void {

        const {
            negociacionId,
            state,
        } = valueObject

        if (negociacionId instanceof IdValueObject && negociacionId.hasErrors())
            this.setErrors(negociacionId.getErrors());
        
        if (state instanceof StateValueObject && state.hasErrors())
            this.setErrors(state.getErrors());


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
            state,
            
        } = valueObject

        return new NegociacionDomainEntity({
            negociacionId : negociacionId,
            state: state,
        })
    }

    //Manda a llamar al al servicio y asi usar sus metodos 
    private exectueStaffDeportivoAggregateRoot(
        entity: NegociacionDomainEntity,
    ): Promise<NegociacionDomainEntity | null> {
        return  this.aggregateRoot.NegociacionModificarState(entity.negociacionId.valueOf(),entity);
    }
}
