import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { PedidoMySqlEntity } from ".";

import { PostreDomainEntityBase } from '../../../../../../domain/entities';

@Entity()
export class PostreMySqlEntity extends PostreDomainEntityBase {
    @PrimaryGeneratedColumn('uuid')
    postreId: string;

    @Column()
    nombre: string;

    @Column()
    tamanio?: string;

    @Column()
    esParaVeganos?: boolean;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;

    @OneToOne( ()=> PedidoMySqlEntity, (pedido)=> pedido.postre )
    pedido: PedidoMySqlEntity;
}