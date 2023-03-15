import { Inject, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { AddedRivalEventPublisher } from "../../../../domain";
import { RivalPostgreEntity } from "../../../persistence";
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class AddedRivalPublisher extends AddedRivalEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = RivalPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}