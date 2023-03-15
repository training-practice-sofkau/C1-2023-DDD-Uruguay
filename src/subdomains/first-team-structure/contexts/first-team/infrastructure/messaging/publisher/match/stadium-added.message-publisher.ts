import { IEventPublisher } from "src/libs";
import { AddedStadiumEventPublisher } from "../../../../domain";
import { Inject } from '@nestjs/common';
import { StadiumPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";

export class AddedStadiumPublisher extends AddedStadiumEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = StadiumPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}