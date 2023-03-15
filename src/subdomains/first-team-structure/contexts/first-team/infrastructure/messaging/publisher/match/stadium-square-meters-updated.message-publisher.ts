import { UpdatedStadiumSquareMetersEventPublisher } from "../../../../domain";
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { StadiumPostgreEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";

@Injectable()
export class UpdatedStadiumSquareMetersPublisher extends UpdatedStadiumSquareMetersEventPublisher {
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