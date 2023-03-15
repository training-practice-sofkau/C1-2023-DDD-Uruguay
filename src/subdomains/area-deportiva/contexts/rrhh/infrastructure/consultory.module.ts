import { Module } from "@nestjs/common";
import { PersistenceModule } from './persistence';
import { MessagingModule } from './messaging';
import { EmpleadoController } from "./controllers/empleado.controller";


@Module({
    imports: [PersistenceModule,MessagingModule],
    controllers: [EmpleadoController],
    providers: [],
    exports: [],
  })
export class ConsultoryModule{}