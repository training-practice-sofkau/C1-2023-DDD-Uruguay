import { Module } from "@nestjs/common";
import { PersistenceModule } from './persistence/persistence.module';
import { CheckInController, CheckOutController, ReserveController } from "./controllers";
import { MessagingModule } from "./messaging/messaging.module";

@Module({
    imports:[PersistenceModule, MessagingModule],
    controllers:[
        CheckInController,
        CheckOutController,
        ReserveController
    ],
    providers:[],
    exports:[]
})
export class ReserveManagementModule{}