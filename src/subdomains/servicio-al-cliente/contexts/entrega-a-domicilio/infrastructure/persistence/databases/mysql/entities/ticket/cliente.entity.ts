import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

import { ClienteDomainEntityBase } from '../../../../../../domain/entities';
import { TicketMySqlEntity } from "./ticket.entity";

@Entity()
export class ClienteMySqlEntity extends ClienteDomainEntityBase {
    @PrimaryGeneratedColumn('uuid')
    clienteId: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;

    @OneToOne( ()=> TicketMySqlEntity, (ticket)=> ticket.cliente )
    ticket: TicketMySqlEntity;
}