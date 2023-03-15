import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { EmployeeStatusChangedEventPublisherBase } from '../../../domain/events/publishers';
import { IEventPublisher } from '@sofka';
import { EmployeeEntity } from '../../persistence/entities/employee.entity';


export class EmployeeStatusChangedPublisher extends EmployeeStatusChangedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = EmployeeEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }