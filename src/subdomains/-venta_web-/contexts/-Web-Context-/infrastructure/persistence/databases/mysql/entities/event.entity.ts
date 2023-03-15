import { Column, Entity } from "typeorm";

@Entity('event')
export class EventMySqlEntity {

    @Column()
    type: string;

    @Column()
    data: string;

    @Column()
    createdAt: number;
}