import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn } from "typeorm"

import { PedidoDomainEntityBase } from '../../../../../../domain/entities';
import { TicketMySqlEntity } from "../ticket";
import {
    PostreMySqlEntity,
    BebidaMySqlEntity,
    EntradaMySqlEntity,
    PlatoPrincipalMySqlEntity
} from ".";

@Entity()
export class PedidoMySqlEntity extends PedidoDomainEntityBase {

    @PrimaryGeneratedColumn('uuid')
    pedidoId?: string;

    @Column()
    estado?: string;
    
    @Column()
    precio?: number;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;


    @OneToOne(() => EntradaMySqlEntity, (entrada) => entrada.pedido,
        { cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    entrada: EntradaMySqlEntity;

    @OneToOne(() => PlatoPrincipalMySqlEntity, (platoPrincipal) => platoPrincipal.pedido,
        { cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    platoPrincipal: PlatoPrincipalMySqlEntity;


    @OneToOne(() => BebidaMySqlEntity, (bebida) => bebida.pedido,
        { cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    bebida: BebidaMySqlEntity;

    @OneToOne(() => PostreMySqlEntity, (postre) => postre.pedido,
        { cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    postre: PostreMySqlEntity;


    @ManyToMany( ()=> TicketMySqlEntity, (ticket)=> ticket.listaPedidos )
    ticket: TicketMySqlEntity;
}