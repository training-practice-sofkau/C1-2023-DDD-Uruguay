import { ClientProxy } from "@nestjs/microservices";
import { UpdatedPlayerWageEventPublisher } from "../../../../domain";
import { Injectable, Inject } from '@nestjs/common';
import { IEventPublisher } from "src/libs";
import { PlayerPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UpdatedPlayerWagePublisher extends UpdatedPlayerWageEventPublisher {
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