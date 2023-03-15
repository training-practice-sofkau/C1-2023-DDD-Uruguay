import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

import { RepartidorDomainEntityBase } from '../../../../../../domain/entities';
import { TicketMySqlEntity } from "./ticket.entity";

@Entity()
export class RepartidorMySqlEntity extends RepartidorDomainEntityBase {
    @PrimaryGeneratedColumn('uuid')
    repartidorId: string;

    @Column()
    nombre: string;

    @Column()
    vehiculo: string;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;

    @OneToOne( ()=> TicketMySqlEntity, (ticket)=> ticket.repartidor )
    ticket: TicketMySqlEntity;
}