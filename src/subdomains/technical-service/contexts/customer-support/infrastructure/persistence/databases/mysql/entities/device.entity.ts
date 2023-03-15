import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceDomainEntityBase } from '../../../../../domain/entities/support-ticket/';

@Entity('device')
export class DeviceMySqlEntity extends DeviceDomainEntityBase{

    @PrimaryGeneratedColumn('uuid')
    deviceID?: string;

    @Column()
    deviceType?: string;

    @Column()
    issues?: string;


}