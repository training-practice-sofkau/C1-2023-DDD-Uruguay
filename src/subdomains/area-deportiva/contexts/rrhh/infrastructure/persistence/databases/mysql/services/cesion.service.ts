import { Injectable } from '@nestjs/common';
import { ICesionDomainService } from '../../../../../domain/services/secretaria/cesion.domain-service';
import { CesionMySqlEntity } from '../entities/cesion-mysql.entity';
import { CesionRepository } from '../repositories/cesion.repository';

/**
 * Servicio de dominio para el manejo de usuarios
 *
 * @export
 * @class CesionMySqlService
 * @implements {ICesionDomainService<CesionMySqlEntity>}
 */
@Injectable()
export class CesionMySqlService
  implements ICesionDomainService<CesionMySqlEntity>
{
  /**
   * Creates an instance of CesionRepository.
   *
   * @param {CesionRepository} sCesionRepository Repositorio de cesion
   * @memberof CesionService
   */
  constructor(private readonly cesionRepository: CesionRepository) {}


  NegociarCesion(cesion: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.create(cesion);
  }

  BuscarCesion(cesionId: string): Promise<CesionMySqlEntity> {
    return this.cesionRepository.findById(cesionId);
  }


   CesionModificarCosto(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }
   CesionModificarFechaSalida(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }
   CesionModificarFechaRetorno(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }
   CesionModificarEquipoNuevo(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }
   CesionModificarEquipoSalida(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }
   CesionModificarState(cesionId: string, entity: CesionMySqlEntity): Promise<CesionMySqlEntity> {
    return this.cesionRepository.update(cesionId, entity);
   
    
  }

 



}
