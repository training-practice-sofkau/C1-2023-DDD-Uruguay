import { CustomerDomainEntityBase } from "src/subdomains/technical-service/contexts/customer-support/domain/entities/invoice";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customer')
export class CustomerMySqlEntity extends CustomerDomainEntityBase {

    @PrimaryGeneratedColumn('uuid')
    customerID?: string; 

    @Column()
    customerName?: string;

    @Column()
    customerEmail?: string;

    @Column()
    customerPhone?: string;

    @Column()
    createdAt?: number;

    @Column()    
    deletedAt?: number;

    @Column()
    updatedAt?: number;

    
}