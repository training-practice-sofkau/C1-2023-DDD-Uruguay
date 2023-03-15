import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IEventPublisher } from 'src/libs';
import { UpdatedTrainingEquipmentTypeEventPublisher } from '../../../../domain/events/publishers/training';
import { TrainingEquipmentPostgreEntity } from '../../../persistence';
@Injectable()
export class UpdatedTrainingEquipmentTypePublisher extends UpdatedTrainingEquipmentTypeEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = TrainingEquipmentPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}