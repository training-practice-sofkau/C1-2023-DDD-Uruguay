import { BaseEntity, Column, Entity, Index, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { ClientDomainBase } from '../../../../../domain/entities/Order-domain/client-domain-entity';
import { OrderEntityDb } from "./Order-entity-db";

@Entity()

export class ClientEntityDB  extends ClientDomainBase{

    @PrimaryGeneratedColumn('uuid')
     ClientID?: string;

    @Column()
    Name?: string;
  
    @Column()
    Phone?: number;


    // @OneToMany(() => OrderEntityDb, order => order.client)
    // order?: OrderEntityDb;
    

}
