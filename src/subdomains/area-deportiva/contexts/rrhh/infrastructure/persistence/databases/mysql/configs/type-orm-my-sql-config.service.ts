import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { StaffDeportivoMySqlEntity, EmpleadoMySqlEntity, TramiteMySqlEntity, NegociacionMySqlEntity, SecretariaMySqlEntity, ContratoMySqlEntity, TraspasoMySqlEntity, CesionMySqlEntity } from '../entities';
import { EventMySqlEntity } from '../entities/event-mysql.entity';

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {

  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      name: connectionName,
      host: 'localhost',//this.configService.get<string>('DB_HOST'),
      port: 3306,//this.configService.get<number>('DB_PORT'),
      username: 'cristian',//this.configService.get<string>('DB_USER'),
      password: '',//this.configService.get<string>('DB_PASSWORD'),
      database: 'area_deportivo_ddd',//this.configService.get<string>('DB_NAME'),
      entities: [
        StaffDeportivoMySqlEntity,
        EmpleadoMySqlEntity,
        TramiteMySqlEntity,
        NegociacionMySqlEntity,
        SecretariaMySqlEntity,
        ContratoMySqlEntity,
        TraspasoMySqlEntity,
        CesionMySqlEntity,
        EventMySqlEntity,
      ],
      synchronize: true,
      logging: true,
      
    };
  }
}
