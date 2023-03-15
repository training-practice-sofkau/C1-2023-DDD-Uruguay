import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IRepositoriBase } from './base/IRepository.base';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MangaEntityDb } from '../entities/Manga-entity-db';

@Injectable()
export class MangaRepository
    implements IRepositoriBase<MangaEntityDb> {


    constructor(@InjectRepository(MangaEntityDb)
    private readonly repository: Repository<MangaEntityDb>) { }


  
    async findById(Mangaid: string): Promise<MangaEntityDb> {
        const Manga = await this.repository.findOneBy({ Mangaid })
        if (!Manga) throw new BadRequestException(`Manga con id ${Mangaid} no encontrado`)
        return Manga
    }

     async   create(entity: MangaEntityDb): Promise<MangaEntityDb> {
     return this.repository.save(entity)    }

  async update(Mangaid: string, newManga: MangaEntityDb): Promise<MangaEntityDb> {
        const Manga = await this.repository.findOneBy({ Mangaid });
        if (Manga) {
          const newEntity = {
            ...newManga,
            Manga,
          };
          return this.repository.save(newEntity);
        }
        throw new NotFoundException(`manga con id ${Mangaid} no encontrado`);
    }

    

   async  delete(Mangaid: string): Promise<boolean> {
        const Manga = await this.repository.findOneBy({ Mangaid });
        if (Manga) {
          await this.repository.remove(Manga);
          return true;
        }
        throw new NotFoundException(`Manga con id ${Mangaid} no encontrado`);
      }    }




