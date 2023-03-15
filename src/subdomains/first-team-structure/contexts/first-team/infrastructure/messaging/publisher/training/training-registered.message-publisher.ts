import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs';
import { RegisteredTrainingEventPublisher } from '../../../../domain/events/publishers/training';
import { TrainingPostgreEntity } from '../../../persistence';
@Injectable()
export class RegisteredTrainingPublisher extends RegisteredTrainingEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = TrainingPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}