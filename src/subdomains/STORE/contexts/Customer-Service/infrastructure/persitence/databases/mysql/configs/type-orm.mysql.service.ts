import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ClientEntityDB, OrderEntityDb, MangaEntityDb, BillEntityDB, saleEntityBd, SellerEntityDB } from "../entities";


@Injectable()

export class TypeOrmMysqlConfigService implements TypeOrmOptionsFactory {

 constructor(private readonly configService: ConfigService){}
    
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions{


        return {            
            type: 'mysql',
            host: "localhost",
            port: 3306,
            username: "root",
            password:  '1234',
            database:  'basededatostiendamanga',
            entities: [
                BillEntityDB,ClientEntityDB,saleEntityBd,OrderEntityDb,SellerEntityDB,MangaEntityDb
            ],
            synchronize: false,
        }
    }




}