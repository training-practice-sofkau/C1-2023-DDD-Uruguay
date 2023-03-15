import { AddedPlayerEventPublisher } from "../../../../domain";
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { PlayerPostgreEntity } from "../../../persistence";
import { IEventPublisher } from "src/libs";

@Injectable()
export class AddedPlayerPublisher extends AddedPlayerEventPublisher {
    constructor(@Inject('FIRST_TEAM') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }

    // send<Result, Input = UserEntity>(pattern: any, data: Input): Promise<Result> {
    //   return lastValueFrom<Result>(this.proxy.send(pattern, data));
    // }

    emit<Result = any, Input = PlayerPostgreEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}