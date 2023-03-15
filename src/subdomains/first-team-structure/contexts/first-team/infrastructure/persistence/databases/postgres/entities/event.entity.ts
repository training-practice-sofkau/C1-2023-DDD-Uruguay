import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event')
export class EventPostgreEntity {

    @PrimaryGeneratedColumn('uuid')
    eventId: string;

    @Column()
    type: string;

    @Column()
    data: string;

    @Column()
    createdAt: number;
}