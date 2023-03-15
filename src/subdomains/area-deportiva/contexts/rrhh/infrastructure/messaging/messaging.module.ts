import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AgregarEmpleadoPublisher } from './publishers/staffDeportivo/empleado/agregar-empleado.publisher';
import { NombreModificadoEventPublisher } from '../../domain/events/publishers/empleado/nombre-modificado.event-publisher';
import { TipoEmpleadoModificadoEventPublisher } from '../../domain/events/publishers/empleado/tipo-empleado-modificado';
import { BuscarEmpleadoPublisher } from './publishers/staffDeportivo/empleado/buscar-empleado.publisher';
import { ModificarTipoEmpleadoPublisher } from './publishers/staffDeportivo/empleado/modificar-tipo-empleado.publisher';
import { ModificarSalarioEmpleadoPublisher } from './publishers/staffDeportivo/empleado/modificar-salario-empleado.publisher';
import { ModificarNombreEmpleadoPublisher } from './publishers/staffDeportivo/empleado/modificar-nombre-empleado.publisher';
import { ModificarDocumentoEmpleadoPublisher } from './publishers/staffDeportivo/empleado/modificar-documento-empleado.publisher';

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
                name: 'RRHH_CONTEXT',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        brokers: ['localhost:9092'],
                    },
                },

            },
        ]),
    ],
    controllers: [],
    providers: [
        AgregarEmpleadoPublisher,
        BuscarEmpleadoPublisher,
        ModificarTipoEmpleadoPublisher,
        ModificarSalarioEmpleadoPublisher,
        ModificarNombreEmpleadoPublisher,
        ModificarDocumentoEmpleadoPublisher,

    ],
    exports: [
        AgregarEmpleadoPublisher,
        BuscarEmpleadoPublisher,
        ModificarTipoEmpleadoPublisher,
        ModificarSalarioEmpleadoPublisher,
        ModificarNombreEmpleadoPublisher,
        ModificarDocumentoEmpleadoPublisher,
        ]
})
export class MessagingModule { }