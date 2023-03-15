import { Module } from '@nestjs/common';
import { TypeOrmMySqlConfigService } from './configs/type-orm-my-sql-config.service';
import { StaffDeportivoRepository } from './repositories/staff-deportivo.repository';
import { EmpleadoRepository } from './repositories/empleado.repository';
import { TramiteRepository } from './repositories/tramite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CesionRepository } from './repositories/cesion.repository';
import { ContratoRepository } from './repositories/contrato.repository';
import { NegociacionRepository } from './repositories/negociacion.repository';
import { SecretariaRepository } from './repositories/secretaria.repository';
import { TraspasoRepository } from './repositories/traspaso.repository';
import { StaffDeportivoMySqlService } from './services/staff-deportivos.service';
import { EmpleadoMySqlService } from './services/empleado.service';
import { TramiteMySqlService } from './services/tramite.service';
import { SecretariaMySqlService } from './services/secretaria.service';
import { ContratoMySqlService } from './services/contrato.service';
import { CesionMySqlService } from './services/cesion.service';
import { TraspasoMySqlService } from './services/traspaso.service';
import { NegociacionMySqlService } from './services/negociacion.service';
import { StaffDeportivoMySqlEntity, EmpleadoMySqlEntity, TramiteMySqlEntity, NegociacionMySqlEntity, SecretariaMySqlEntity, ContratoMySqlEntity, TraspasoMySqlEntity, CesionMySqlEntity } from './entities';
import { EventMySqlEntity } from './entities/event-mysql.entity';
import { EventRepository } from './repositories/event.repository';
import { EventMySqlService } from './services/event.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMySqlConfigService
    }),
    TypeOrmModule.forFeature([
      StaffDeportivoMySqlEntity,
      EmpleadoMySqlEntity,
      TramiteMySqlEntity,
      NegociacionMySqlEntity,
      SecretariaMySqlEntity,
      ContratoMySqlEntity,
      TraspasoMySqlEntity,
      CesionMySqlEntity,

      EventMySqlEntity
    ]),
  ],
  controllers: [],
  providers: [
    
    TypeOrmMySqlConfigService,
    
    StaffDeportivoMySqlService,
    EmpleadoMySqlService,
    TramiteMySqlService,
    SecretariaMySqlService,
    ContratoMySqlService,
    CesionMySqlService,
    TraspasoMySqlService,
    NegociacionMySqlService,

    EventMySqlService,

    StaffDeportivoRepository,
    EmpleadoRepository,
    TramiteRepository,
    SecretariaRepository,
    ContratoRepository,
    CesionRepository,
    NegociacionRepository,
    TraspasoRepository,

    EventRepository,

  ],
  exports: [
    StaffDeportivoMySqlService,
    EmpleadoMySqlService,
    TramiteMySqlService,
    SecretariaMySqlService,
    ContratoMySqlService,
    CesionMySqlService,
    TraspasoMySqlService,
    NegociacionMySqlService,

    EventMySqlService,

    StaffDeportivoRepository,
    EmpleadoRepository,
    TramiteRepository,
    SecretariaRepository,
    ContratoRepository,
    CesionRepository,
    NegociacionRepository,
    TraspasoRepository,

    EventRepository,
    ],
})
export class MySqlModule {}
