import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import { ClientEntityDB } from './Client-entity-db';
import { MangaEntityDb } from './Manga-entity-db';
import { OrderDomainEntityBase } from '../../../../../domain/entities/Order-domain/Order-domain-entity';


@Entity()
export class OrderEntityDb extends OrderDomainEntityBase {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;


  @OneToMany(() => ClientEntityDB, (client) => client.ClientID, {
    cascade: ['insert', 'update']
  })
  
  client: ClientEntityDB;
  

  @ManyToOne(() => MangaEntityDb, (manga) => manga.order,{
    cascade: ['insert', 'update']
  })
  @JoinColumn()
  manga: MangaEntityDb;
}