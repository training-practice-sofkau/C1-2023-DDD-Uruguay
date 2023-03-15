import { Inject } from "@nestjs/common";
import { CustomerAddedEventPublisher } from "../../../../domain";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs/sofka";
import { CustomerEntity } from "../../../persistence/entities";
import { lastValueFrom } from 'rxjs';

export class CustomerAddedMessagePublisher extends CustomerAddedEventPublisher {

    /**
     * ClientProxy es una clase proporcionada por
     * @nestjs/microservices que se utiliza para 
     * conectarse a un broker de mensajería 
     * (como RabbitMQ o Kafka) y enviar y recibir mensajes.
     * 
     * Creates an instance of CreateOrderPublisher.
     * @param {ClientProxy} proxy
     * @memberof CustomerAddedMessagePublisher
     */
    constructor(

        @Inject('RESERVE_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    /**
     *     * El método emit en CreateOrderPublisher utiliza lastValueFrom de rxjs
     *  para enviar un mensaje al broker de mensajería utilizando el ClientProxy inyectado.
     *  El mensaje que se envía es un objeto pattern y data. pattern es una cadena
     *  que identifica el tipo de evento que se está enviando,
     *  y data es la información específica del evento que se está enviando.
     *
     * @template Result
     * @template Input
     * @param {*} pattern
     * @param {Input} data
     * @return {*}  {Promise<Result>}
     * @memberof CustomerAddedMessagePublisher
     */
    emit<Result = any, Input = CustomerEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}
