import { Module } from '@nestjs/common';
import { MySqlModule } from './databases/mysql/mysql.module';
import { StaffDeportivoService, EmpleadoService, TramiteService, SecretariaService, ContratoService, CesionService, TraspasoService, NegociacionService } from './services';

@Module({
  imports: [MySqlModule],
  providers: [
    
    StaffDeportivoService,
    EmpleadoService,
    TramiteService,
    SecretariaService,
    ContratoService,
    CesionService,
    TraspasoService,
    NegociacionService,

    
],
  exports: [
    StaffDeportivoService,
    EmpleadoService,
    TramiteService,
    SecretariaService,
    ContratoService,
    CesionService,
    TraspasoService,
    NegociacionService,

  ],
})
export class PersistenceModule {}
