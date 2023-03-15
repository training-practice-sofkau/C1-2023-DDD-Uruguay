import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

import { PedidoMySqlEntity } from ".";
import { BebidaDomainEntityBase } from '../../../../../../domain/entities';

@Entity()
export class BebidaMySqlEntity extends BebidaDomainEntityBase {
    @PrimaryGeneratedColumn('uuid')
    bebidaId: string;

    @Column()
    nombre: string;

    @Column()
    tamanio?: string;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;

    @OneToOne( ()=> PedidoMySqlEntity, (pedido)=> pedido.bebida )
    pedido: PedidoMySqlEntity;
}