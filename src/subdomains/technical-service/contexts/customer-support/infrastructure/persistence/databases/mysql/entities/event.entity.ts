import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventMySqlEntity {

    @PrimaryGeneratedColumn('uuid')
    eventID: string;
    
    @Column()
    type: string;

    @Column()
    data: string;

    @Column()
    createdAt: number;
}