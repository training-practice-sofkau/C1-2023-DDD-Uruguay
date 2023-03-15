import { UpdatedDateEventPublisher } from "../../../../domain";
import { Inject, Injectable } from '@nestjs/common';
import { IEventPublisher } from "src/libs";
import { ClientProxy } from "@nestjs/microservices";
import { MatchPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UpdatedDatePublisher extends UpdatedDateEventPublisher {
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