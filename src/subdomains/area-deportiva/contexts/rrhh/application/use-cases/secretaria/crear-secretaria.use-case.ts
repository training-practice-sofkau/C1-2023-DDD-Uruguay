import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from "src/libs";
import { ICrearSecretariaCommands } from '../../../domain/interfaces/commands/secretaria/crear-secretaria.commands.interface';
import { ISecretariaCreadaResponse } from '../../../domain/interfaces/responses/secretaria/secretaria-creada.response.interface';
import { secretariaCreadaEventPublisher } from '../../../domain/events/publishers/secretaria/secretaria-creada.event-publisher';
import { ISecretariaDomainService } from '../../../domain/services/secretaria/secretaria.domain-service';
import { SecretariaAggregate } from '../../../domain/aggregates/secretaria/secretaria.aggregate';
import { ContratoBuscadaEventPublisher } from '../../../domain/events/publishers/secretaria/contrato-buscado.event-publisher';
import { CesionBuscadaEventPublisher } from "../../../domain/events/publishers/secretaria/cesion-buscada.event-publisher";
import { TraspasoBuscadaEventPublisher } from "../../../domain/events/publishers/secretaria/traspaso-buscado.event-publisher";
import { SecretariaDomainEntity } from '../../../domain/entities/secretaria/secretaria.domain-entity';
import { BuscarContatoUseCase } from './buscar-contrato.use-case';
import { BuscarCesionUseCase } from './buscar-cesion.use-case';
import { BuscarTraspasoUseCase } from './buscar-traspaso.use-case';
import { IdValueObject } from "../../../domain/value-objects";
import { ICesionDomainService, IContratoDomainService, ITraspasoDomainService } from 'src/subdomains/area-deportiva/contexts/rrhh/domain/services';


export class CrearSecretariaUseCase extends ValueObjectErrorHandler
implements IUseCase<ICrearSecretariaCommands, ISecretariaCreadaResponse> {
    
    private readonly aggregateRoot: SecretariaAggregate;

    constructor(
        private readonly secretariaService: ISecretariaDomainService,
        private readonly contratoService: IContratoDomainService,
        private readonly cesionService: ICesionDomainService,
        private readonly traspasoService: ITraspasoDomainService,

        private readonly secretariaCreadaEvent : secretariaCreadaEventPublisher,
        private readonly contratoBuscadoEvent : ContratoBuscadaEventPublisher,
        private readonly cesionBuscadaEvent : CesionBuscadaEventPublisher,
        private readonly traspasoBuscadoEvent : TraspasoBuscadaEventPublisher,

    ){
        super();
        this.aggregateRoot = new SecretariaAggregate(
            {
                secretariaService,
                contratoService,
                cesionService,
                traspasoService,

                secretariaCreadaEvent,
                contratoBuscadoEvent,
                cesionBuscadaEvent,
                traspasoBuscadoEvent,
            });
    }

    async execute(command: ICrearSecretariaCommands): Promise<ISecretariaCreadaResponse> {

        //Creo los value object 
        const secretariaId = new IdValueObject(command.secretariaId);
        const staffDeportivoId = new IdValueObject(command.staffDeportivoId);
        const empleadoId = new IdValueObject(command.empleadoId);
        const contratoId = new IdValueObject(command.contrato);
        const traspasoId = new IdValueObject(command.traspaso);
        const cesionId = new IdValueObject(command.cesion);
        


        // Recopilando errores
        if (secretariaId.hasErrors() === true) this.setErrors(secretariaId.getErrors());
        if (staffDeportivoId.hasErrors() === true) this.setErrors(staffDeportivoId.getErrors());
        if (empleadoId.hasErrors() === true) this.setErrors(empleadoId.getErrors());
        if (contratoId.hasErrors() === true) this.setErrors(contratoId.getErrors());
        if (traspasoId.hasErrors() === true) this.setErrors(traspasoId.getErrors());
        if (cesionId.hasErrors() === true) this.setErrors(cesionId.getErrors());

        // Validando errores
        if (this.hasErrors() === true)
            throw new ValueObjectException(
            'Errores en el comando "ICrearSecretariaCommand"',
            this.getErrors(),
            );
            
        
        const obtenerContrato = new BuscarContatoUseCase(this.contratoService,this.contratoBuscadoEvent);
        const obtenerCesion = new BuscarCesionUseCase(this.cesionService,this.cesionBuscadaEvent);
        const obtenerTraspaso = new BuscarTraspasoUseCase(this.traspasoService,this.traspasoBuscadoEvent);
    
        // Ejecución de la lógica del caso de uso
        const entity = new SecretariaDomainEntity({
            secretariaId: secretariaId.valueOf(),
            staffDeportivoId: staffDeportivoId.valueOf(),
            empleadoId: empleadoId.valueOf(),
            contrato: (await obtenerContrato.execute({contratoId: command.contrato})).data ,
            cesion: (await obtenerCesion.execute({cesionId : command.cesion})).data,
            traspaso:(await obtenerTraspaso.execute({traspasoId : command.traspaso})).data,
        });
        const result = await this.aggregateRoot.CrearSecretaria(entity);//Se le puede pasar directamente la entidad como tambien se le pude pasar la interface 

        // Retornando la respuesta
        return { success: true,data: result };

    }


}
