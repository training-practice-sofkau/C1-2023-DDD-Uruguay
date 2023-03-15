import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeDomainEntityBase } from '../../../../../domain/entities/employee/employee.domain-entity';

@Entity('employee')
export class EmployeeMySqlEntity extends EmployeeDomainEntityBase{

    @PrimaryGeneratedColumn('uuid')
    employeeID: string;

    @Column()
    employeeName: string; 
    
    @Column()
    employeeEmail: string;

    @Column()
    employeeRoleId: string;

    @Column({default: true})
    employeeIsActive: boolean;

}