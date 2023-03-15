import { Controller, Module } from "@nestjs/common";
import {
    TicketController,

    PedidoController,

} from "./controllers";
import { MessagingModule } from "./messaging/messaging.module";
import { PersistenceModule } from "./persistence/persistence.module";

@Module({
    imports:[PersistenceModule, MessagingModule],
    controllers:[
        TicketController,

        PedidoController,

    ],
    providers:[],
    exports:[]
})
export class EntregaADomicilioModule {}