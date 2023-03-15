import { ClientRepository } from './../repositories/Client-Repository';
import { ClientDomainBase, MangaDomainBase } from "src/subdomains/Store/contexts/Customer-Service/domain/entities";
import { IUpdateOrder, IDeleteOrder, IUpdateMangaStock, IUpdateClient } from "src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands";
import { IorderDomainService } from "src/subdomains/Store/contexts/Customer-Service/domain/services";
import { OrderService } from "../../../services";
import { OrderEntityDb, ClientEntityDB } from "../entities";
import { OrderRepository } from '../repositories/Order-Repository';
import { MangaRepository } from '../repositories/Manga-repository';
import { MangaEntityDb } from '../entities/Manga-entity-db';
import { Injectable } from '@nestjs/common';
import { IaddClientCOmmand } from '../../../../utils/commands/order/IaddClientCOmmand';

@Injectable()
export class OrdertMySqlService implements IorderDomainService<OrderEntityDb> {

    constructor(private readonly OrderRepository: OrderRepository, private readonly MangaRepository: MangaRepository, private readonly ClientRepository: ClientRepository
       ) { }


    RegisterOrder(data: OrderEntityDb): Promise<OrderEntityDb> {
        return this.OrderRepository.create(data)
    }
    GetClient(data: string): Promise<ClientEntityDB> {
        return this.ClientRepository.findById(data)
    }
   
    Delete(data: string): Promise<OrderEntityDb> {
        const DeleteUster = this.OrderRepository.findById(data)
         this.OrderRepository.delete(data);
        return DeleteUster;
        
    }
    GetManga(data: string): Promise<MangaEntityDb> {
        return this.MangaRepository.findById(data)
    }
    AddClient(data: ClientEntityDB ): Promise<ClientEntityDB> {
        return this.ClientRepository.create(data)
    }

    UpdateMangaStock(data: MangaEntityDb): Promise<MangaEntityDb> {
      
        return this.MangaRepository.update(data.Mangaid, data)
        }

}
