import { MangaEntityDb } from './../entities/Manga-entity-db';
import { MangaDomainBase } from 'src/subdomains/Store/contexts/Customer-Service/domain/entities';
import { IUpdateTotal, IGetMangaData } from 'src/subdomains/Store/contexts/Customer-Service/domain/interfaces/commands';
import { BillDomainService } from '../../../../../domain/services/Bill-domain-service';
import { BillEntityDB } from '../entities/Bill-entity';
import { BillRepository } from '../repositories/Bill-repository';
import { MangaRepository } from '../repositories/Manga-repository';

export class BillMySqlService implements BillDomainService<BillEntityDB> {

    constructor( private readonly BillRepository: BillRepository, private readonly MangaRepository: MangaRepository){}


    UpdatePaymentMethod(data: BillEntityDB): Promise<BillEntityDB> {
        return this.BillRepository.update(data.IDBill, data)
    }
    UpdateTotal(data: BillEntityDB): Promise<BillEntityDB> {
        return this.BillRepository.update(data.IDBill, data)
    }
     getMangaData(data: string): Promise<MangaEntityDb> {
        return  this.MangaRepository.findById(data)
        
    }
}
