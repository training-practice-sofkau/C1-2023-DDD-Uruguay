import { UpdatedDurationEventPublisher } from "../../../../domain/events/publishers/training";
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import { TrainingPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UpdatedDurationPublisher extends UpdatedDurationEventPublisher {
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