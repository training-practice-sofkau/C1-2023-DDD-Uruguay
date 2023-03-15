import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IEventPublisher } from '@sofka';
import { RoleCreatedEventPublisherBase } from '../../../domain/events/publishers';
import { RoleEntity } from '../../persistence/entities/role.entity';


export class RoleCreatedPublisher extends RoleCreatedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = RoleEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }