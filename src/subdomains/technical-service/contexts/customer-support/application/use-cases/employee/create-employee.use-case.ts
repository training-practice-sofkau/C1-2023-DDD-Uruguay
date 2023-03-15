import { ValueObjectErrorHandler, IUseCase, ValueObjectException } from '@sofka';
import { ICreateEmployeeCommand , IEmployeeCreatedResponse, } from '../../../domain/interfaces/';
import { EmployeeAggregate } from '../../../domain/aggregates/';
import { IEmployeeDomainService } from '../../../domain/services/';
import { EmployeeCreatedEventPublisherBase } from '../../../domain/events/';
import { IEmployeeDomainEntity } from '../../../domain/entities/interfaces/employee/';
import { UUIDValueObject, FullnameValueObject, EmailValueObject } from '../../../domain/value-objects/';
import { EmployeeDomainEntityBase } from '../../../domain/entities/employee/employee.domain-entity';


export class CreateEmployeeUseCase <
    Command extends ICreateEmployeeCommand = ICreateEmployeeCommand,
    Response extends IEmployeeCreatedResponse = IEmployeeCreatedResponse,
> extends ValueObjectErrorHandler implements IUseCase<Command, Response> {

    private readonly employeeAggregateRoot: EmployeeAggregate;

    constructor(
        private readonly employeeService: IEmployeeDomainService,
        private readonly employeeCreatedEventPublisherBase: EmployeeCreatedEventPublisherBase
    ) {
        super();
        this.employeeAggregateRoot = new EmployeeAggregate({
            employeeService,
            employeeCreatedEventPublisherBase
        })
    }


    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);
        return { success: data ? true : false, data } as unknown as Response;
    }



    /**
     * executes all the steps needed to make a new entity
     *
     * @private
     * @param {Command} command
     * @return {*}  {(Promise<IEmployeeDomainEntity | null>)}
     * @memberof CreateEmployeeUseCase
     */
    private async executeCommand(command: Command): Promise<IEmployeeDomainEntity | null> {

        const VO = this.createValueObject(command);

        //this.validateValueObject(VO);

        const entity = this.createEntityEmployeeDomain(VO);

        return this.executeCreateEmployeeAggregateRoot(entity);        
    }


    /**
     * Generates a new ValueObject of type Employee
     *
     * @param {Command} command
     * @return {*}  {IEmployeeDomainEntity}
     * @memberof CreateEmployeeUseCase
     */
    createValueObject(command: Command): IEmployeeDomainEntity {

        const employeeName = new FullnameValueObject(command.employeeFullname);
        const employeeEmail = new EmailValueObject(command.employeeEmail);
        const employeeRoleId = new UUIDValueObject(command.employeeRoleID);
        const employeeIsActive = true;

        return {
            employeeName,
            employeeEmail,
            employeeRoleId,
            employeeIsActive,
        }
    }


    /**
     * Checks that the information of the newly created VO is valid
     *
     * @param {IEmployeeDomainEntity} VO
     * @memberof CreateEmployeeUseCase
     */
    validateValueObject(VO: IEmployeeDomainEntity): void {
        const {
            employeeName,
            employeeEmail,
            employeeRoleId,
            employeeIsActive,
        } = VO;

        // validate Employee Fullname
        if (employeeName instanceof FullnameValueObject && employeeName.hasErrors())
            this.setErrors(employeeName.getErrors());

        // validate Employee Email
        if (employeeEmail instanceof EmailValueObject && employeeEmail.hasErrors())
            this.setErrors(employeeEmail.getErrors());

        // validate Employee Role ID
        if (employeeRoleId instanceof UUIDValueObject && employeeRoleId.hasErrors())
            this.setErrors(employeeRoleId.getErrors());

        
        if (this.hasErrors() === true)
            throw new ValueObjectException(
                'CreateEmployeeUseCase command execution return some errors!',
                this.getErrors(),
            );
    }

    /**
     * Creates and returns a new Employee Entity
     *
     * @private
     * @param {IEmployeeDomainEntity} VO
     * @return {*}  {EmployeeDomainEntityBase}
     * @memberof CreateEmployeeUseCase
     */
    private createEntityEmployeeDomain(VO: IEmployeeDomainEntity): EmployeeDomainEntityBase {
        const {
            employeeName,
            employeeEmail,
            employeeRoleId,
            employeeIsActive,
        } = VO;

        return new EmployeeDomainEntityBase({

            employeeName: employeeName.valueOf(),
            employeeEmail: employeeEmail.valueOf(),
            employeeRoleId: employeeRoleId.valueOf(),
            employeeIsActive: employeeIsActive.valueOf(),
        })        
    }

    /**
     * Executes the method on the aggregate
     *
     * @private
     * @param {EmployeeDomainEntityBase} entity
     * @return {*}  {(Promise< EmployeeDomainEntityBase | null >)}
     * @memberof CreateEmployeeUseCase
     */
    private executeCreateEmployeeAggregateRoot(
        entity: EmployeeDomainEntityBase,
    ): Promise< EmployeeDomainEntityBase | null > {

        return this.employeeAggregateRoot.CreateEmployee(entity);
    }

}