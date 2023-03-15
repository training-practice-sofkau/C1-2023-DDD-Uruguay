import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('event', { schema: 'public' })
export class EventMySqlEntity   {

  @PrimaryGeneratedColumn('uuid')
  eventID: string;

  @Column()
  type: string;

  @Column()
  data: string;

  @Column()
  createAt: string;

}
