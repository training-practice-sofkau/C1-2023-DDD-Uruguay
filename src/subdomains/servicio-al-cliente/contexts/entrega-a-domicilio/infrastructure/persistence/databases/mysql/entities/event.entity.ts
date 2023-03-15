import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('event', { schema: 'public' })
export class EventMySqlEntity {
    @PrimaryGeneratedColumn('uuid')
    eventId?: string;

    @Column()
    type: string;

    @Column()
    data: string;

    @Column()
    createdAt?: Date;
}