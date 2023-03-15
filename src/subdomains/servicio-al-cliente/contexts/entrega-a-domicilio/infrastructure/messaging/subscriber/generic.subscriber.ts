import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";

import { EventMySqlEntity, EventMySqlService } from "../../persistence";


@Controller()
export class GenericSubscriberController{

    constructor(private readonly eventService?: EventMySqlService) {}

    async crearEvento(data: any, context: KafkaContext) {

        await this.eventService.crearEvent(
            {
                data: JSON.stringify(data.data),
                type: context.getTopic()
            } as EventMySqlEntity

        );
    }

    /**
     * EventPattern se utiliza para definir un patrón de evento de Kafka
     * al que el controlador responderá.
     * 
     * Payload se utiliza para extraer los datos del mensaje del evento.
     *
     * KafkaContext que se utiliza para acceder a los metadatos del contexto de Kafka.
     * 
     * En el contexto de los eventos Kafka, el término "payload"
     * se refiere a los datos contenidos en el mensaje del evento. 
     * En otras palabras, el payload es la carga útil de información 
     * que se envía en el mensaje de Kafka.
     * 
     * @param {*} data
     * @param {KafkaContext} context
     * @memberof GenericSubscriberController
     */
    @EventPattern('entrega_a_domicilio.bebida-creada')
    bebidaCreada(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.entrada-creada')
    entradaCreada(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.postre-creado')
    postreCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.plato-principal-creado')
    platoPrincipalCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.pedido-creado')
    pedidoCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.estado-pedido-cambiado')
    estadoPedidoCambiado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.precio-pedido-cambiado')
    precioPedidoCambiado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.nombre-bebida-cambiado')
    nombreBebidaCambiado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.tamanio-bebida-cambiado')
    tamanioBebidaCambiado(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.bebida-obtenida')
    bebidaObtenida(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('entrega_a_domicilio.pedido-obtenido')
    pedidoObtenido(@Payload() data: any, @Ctx() context: KafkaContext){

        this.crearEvento(data, context);

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
}