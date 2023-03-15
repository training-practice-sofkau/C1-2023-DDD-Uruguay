import { Body, Controller, Post } from "@nestjs/common";
import { EmployeeService } from '../persistence/services';

import { 
    EmployeeCreatedPublisher,
    EmployeeEmailChangedPublisher, 
    EmployeeStatusChangedPublisher 

} from "../messaging";

import { ChangeEmployeeEmailUseCase, ChangeEmployeeStatusUseCase, CreateEmployeeUseCase } from "../../application";

import { ChangeEmployeeMailCommand , ChangeEmployeeStatusCommand, CreateEmployeeCommand} from "../utils/commands";


@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly employeeCreatedEventPublisherBase: EmployeeCreatedPublisher,
        private readonly employeeEmailChangedEventPublisherBase: EmployeeEmailChangedPublisher,
        private readonly employeeStatusChangedEventPublisherBase: EmployeeStatusChangedPublisher,
    ){}


    // Get HTTP petition to creates a new Employee
    @Post('/add-employee')
    async createEmployee(@Body() command: CreateEmployeeCommand) {
        const useCase = new CreateEmployeeUseCase(
            this.employeeService,
            this.employeeCreatedEventPublisherBase,
        );
        return await useCase.execute(command);
    }    

    // Get HTTP petition to updates Employee Status
    @Post('/change-employee-status')
    async changeEmployeeStatus(@Body() command: ChangeEmployeeStatusCommand) {
        const useCase = new ChangeEmployeeStatusUseCase(
            this.employeeService,
            this.employeeStatusChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }    

    // Get HTTP petition to updates Employee email
    @Post('/change-employee-email')
    async changeEmployeeEmail(@Body() command: ChangeEmployeeMailCommand) {
        const useCase = new ChangeEmployeeEmailUseCase(
            this.employeeService,
            this.employeeEmailChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }    
    
}