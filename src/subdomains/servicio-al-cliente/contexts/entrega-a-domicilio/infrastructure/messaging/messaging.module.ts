import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { MySqlModule } from '../persistence';
import {
    PedidoCreadoPublisher,
    EntradaCreadaPublisher,
    PlatoPrincipalCreadoPublisher,
    PostreCreadoPublisher,
    BebidaCreadaPublisher,

    TicketCreadoPublisher,
    ClienteCreadoPublisher,
    RepartidorCreadoPublisher,
    
    EstadoPedidoCambiadoPublisher,
    PrecioPedidoCambiadoPublisher,
    NombreBebidaCambiadoPublisher,
    TamanioBebidaCambiadoPublisher,

    PedidoObtenidoPublisher,
    BebidaObtenidaPublisher,

} from './publisher';

import { GenericSubscriberController } from './subscriber';

/**
 * name: el nombre del cliente.
 * Este es un identificador único que se utiliza para referenciar este cliente
 * en otras partes de la aplicación.
 * 
 * transport: el tipo de transporte utilizado para conectarse a Kafka.
 * En este caso, se utiliza Transport.KAFKA,
 * que indica que se conectará a un servidor Kafka. 
 * options: un objeto que define las opciones de configuración
 * específicas para el cliente Kafka. En este caso,
 * solo se especifica un objeto client que define los brokers
 * a los que se conectará el cliente. Los brokers son los servidores
 * de Kafka que gestionan los mensajes y actúan como intermediarios
 * entre los productores y los consumidores. En este ejemplo,
 * se especifica que el cliente se conectará a un solo broker alojado
 * en localhost en el puerto 9092.
 *
 * @export
 * @class MessagingModule
 */
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ENTREGA-A-DOMICILIO_CONTEXT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092'],
                    },
                },

            },
        ]),
        MySqlModule
    ],
    controllers: [GenericSubscriberController],
    providers: [
        PedidoCreadoPublisher,
        EntradaCreadaPublisher,
        PlatoPrincipalCreadoPublisher,
        PostreCreadoPublisher,
        BebidaCreadaPublisher,

        TicketCreadoPublisher,
        ClienteCreadoPublisher,
        RepartidorCreadoPublisher,
        
        EstadoPedidoCambiadoPublisher,
        PrecioPedidoCambiadoPublisher,
        NombreBebidaCambiadoPublisher,
        TamanioBebidaCambiadoPublisher,

        PedidoObtenidoPublisher,
        BebidaObtenidaPublisher,
    ],
    exports: [
        PedidoCreadoPublisher,
        EntradaCreadaPublisher,
        PlatoPrincipalCreadoPublisher,
        PostreCreadoPublisher,
        BebidaCreadaPublisher,

        TicketCreadoPublisher,
        ClienteCreadoPublisher,
        RepartidorCreadoPublisher,
        
        EstadoPedidoCambiadoPublisher,
        PrecioPedidoCambiadoPublisher,
        NombreBebidaCambiadoPublisher,
        TamanioBebidaCambiadoPublisher,

        PedidoObtenidoPublisher,
        BebidaObtenidaPublisher,
    ]
})
export class MessagingModule { }
