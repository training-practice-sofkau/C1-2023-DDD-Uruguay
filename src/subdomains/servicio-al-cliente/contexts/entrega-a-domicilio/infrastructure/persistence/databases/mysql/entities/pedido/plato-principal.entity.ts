import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { PedidoMySqlEntity } from ".";

import { PlatoPrincipalDomainEntityBase } from '../../../../../../domain/entities';

@Entity()
export class PlatoPrincipalMySqlEntity extends PlatoPrincipalDomainEntityBase {
    @PrimaryGeneratedColumn('uuid')
    platoPrincipalId: string;

    @Column()
    nombre: string;

    @Column()
    guarnicion: string;

    @Column({ type: 'datetime' })
    createdAt?: number | Date;

    @OneToOne( ()=> PedidoMySqlEntity, (pedido)=> pedido.platoPrincipal )
    pedido: PedidoMySqlEntity;
}