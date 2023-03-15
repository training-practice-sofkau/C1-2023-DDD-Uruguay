import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClientEntityDB } from "../entities/Client-entity-db";
import { IRepositoriBase } from './base/IRepository.base';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientRepository
    implements IRepositoriBase<ClientEntityDB> {


    constructor(@InjectRepository(ClientEntityDB) private readonly repository: Repository<ClientEntityDB>) { }


  
    async findById(ClientID: string): Promise<ClientEntityDB> {
        const client = await this.repository.findOneBy({ ClientID })
        if (!client) throw new BadRequestException(`Usuario con id ${ClientID} no encontrado`)
        return client
    }

     async   create(entity: ClientEntityDB): Promise<ClientEntityDB> {

      return this.repository.save(entity)  
      
        }


   async  update(ClientID: string, newClient: ClientEntityDB): Promise<ClientEntityDB> {
        const client = await this.repository.findOneBy({ ClientID });
        if (client) {
          const newEntity = {
            ...newClient,
            client,
          };
          return this.repository.save(newEntity);
        }
        throw new NotFoundException(`Usuario con id ${ClientID} no encontrado`);
    }

    


   async  delete(ClientID: string): Promise<boolean> {
        const client = await this.repository.findOneBy({ ClientID });
        if (client) {
          await this.repository.remove(client);
          return true;
        }
        throw new NotFoundException(`Usuario con id ${ClientID} no encontrado`);
      }    }




