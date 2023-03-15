import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm"

import { TicketDomainEntityBase } from '../../../../../../domain/entities';
import { PedidoMySqlEntity } from "../pedido/pedido.entity";
import { ClienteMySqlEntity } from "./cliente.entity";
import { RepartidorMySqlEntity } from "./repartidor.entity";

@Entity()
export class TicketMySqlEntity extends TicketDomainEntityBase {

    @PrimaryGeneratedColumn('uuid')
    ticketId: string;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;


    @OneToOne(() => ClienteMySqlEntity, (cliente) => cliente.ticket,
        { cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    cliente: ClienteMySqlEntity;


    @OneToOne(() => RepartidorMySqlEntity, (repartidor) => repartidor.ticket,
        {cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    repartidor: RepartidorMySqlEntity


    @OneToMany( ()=> PedidoMySqlEntity, (pedido)=> pedido.ticket,
        {cascade: ['insert', 'update'],},
    )
    @JoinColumn()
    listaPedidos?: PedidoMySqlEntity[];    
    
}