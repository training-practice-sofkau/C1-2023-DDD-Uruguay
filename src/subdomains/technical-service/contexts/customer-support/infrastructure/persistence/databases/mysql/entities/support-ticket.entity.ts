import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SupportTicketDomainEntityBase } from '../../../../../domain/entities/support-ticket/service-ticket.domain-entity';

@Entity('support-ticket')
export class SupportTicketMySqlEntity extends SupportTicketDomainEntityBase{

    @PrimaryGeneratedColumn('uuid')
    ticketID?:  string;

    @Column()
    dateOpen?: number;

    @Column()
    deviceID?:  string;

    @Column()
    repairsID?:  string;

    @Column()
    employeeID?:  string;

    @Column({default:true})
    isOpen?: boolean;

    @Column()
    dateClose?: number;
}