import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { WarrantyDomainEntityBase } from '../../../../../domain/entities/invoice/warranty.domain-entity/warranty.domain-entity';

@Entity('warranty')
export class WarrantyMySqlEntity extends WarrantyDomainEntityBase{

    @PrimaryGeneratedColumn('uuid')
    warrantyID?: string;

    @Column()
    startDate?: number; 

    @Column()
    warrantyStatus?: string;

    @Column()
    endDate?: number;
}