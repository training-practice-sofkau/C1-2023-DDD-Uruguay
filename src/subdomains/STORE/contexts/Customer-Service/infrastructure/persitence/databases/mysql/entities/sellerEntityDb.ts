import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { SellerDomain } from '../../../../../domain/entities/Sale-domain/seller-domain-entity';
import { saleEntityBd } from './Sale-entity';


@Entity()

export class SellerEntityDB  extends SellerDomain{

    @PrimaryGeneratedColumn('uuid')
    IdSeller: string 
    @Index()

    @Column()
    Name: string 


    @OneToOne(() => saleEntityBd, sale => sale.Seller)
    sale: saleEntityBd;
}
