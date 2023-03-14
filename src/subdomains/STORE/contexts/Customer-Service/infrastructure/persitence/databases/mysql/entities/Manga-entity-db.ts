import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import { MangaDomainBase } from '../../../../../domain/entities/Order-domain/manga-domain-entity';
import { OrderEntityDb } from "./Order-entity-db";

@Entity()
export class MangaEntityDb extends MangaDomainBase{
  @PrimaryGeneratedColumn('uuid') 
   Mangaid: string;

  @Column()
  Name: string;

  @Column()
  state: string;

  @Column()
  Price: number;

  @Column()
  Stock: number;

  @ManyToOne(() => OrderEntityDb, order => order.Manga)
  order: OrderEntityDb;
}