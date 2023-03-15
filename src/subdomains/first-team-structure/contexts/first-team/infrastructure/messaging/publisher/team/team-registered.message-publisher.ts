import { RegisteredTeamEventPublisher } from "../../../../domain";
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import { TeamPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class RegisteredTeamPublisher extends RegisteredTeamEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = TeamPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}