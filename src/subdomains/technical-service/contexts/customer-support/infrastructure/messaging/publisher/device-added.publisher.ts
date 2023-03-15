import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { IEventPublisher } from '@sofka';
import { DeviceAddedEventPublisherBase } from '../../../domain/events/publishers/';
import { DeviceEntity } from '../../persistence/entities/device.entity';


export class DeviceAddedPublisher extends DeviceAddedEventPublisherBase{

    constructor(
        @Inject('TECHNICAL-SERVICE_CONTEXT') private readonly proxy: ClientProxy)
        {
            super(proxy as unknown as IEventPublisher);
        }


        emit<Result = any, Input = DeviceEntity>(
            pattern: any,
            data: Input,
        ): Promise<Result> {
            return lastValueFrom<Result>(this.proxy.emit(pattern, data));
        }
    }