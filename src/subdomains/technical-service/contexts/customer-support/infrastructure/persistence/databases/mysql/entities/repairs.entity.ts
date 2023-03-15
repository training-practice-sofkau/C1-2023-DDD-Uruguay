import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RepairsDomainEntityBase } from '../../../../../domain/entities/support-ticket/repairs.domain-entity/repairs.domain-entity';

@Entity('repairs')
export class RepairsMySqlEntity extends RepairsDomainEntityBase{

    @PrimaryGeneratedColumn('uuid')
    repairID?: string;

    @Column()
    repairDate?: number;

    @Column()
    repairs?: string;

    @Column({default:false})
    workFinished?: boolean;

}