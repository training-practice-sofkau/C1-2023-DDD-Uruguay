import { RegisteredMatchEventPublisher } from '../../../../domain/events/publishers/match/registered-match.event-publisher';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IEventPublisher } from 'src/libs';
import { lastValueFrom } from 'rxjs';
import { MatchPostgreEntity } from '../../../persistence';
@Injectable()
export class RegisteredMatchPublisher extends RegisteredMatchEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = MatchPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}