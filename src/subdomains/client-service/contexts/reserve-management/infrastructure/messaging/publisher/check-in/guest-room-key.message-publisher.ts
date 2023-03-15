import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { RoomKeyObtainedEventPublisher } from "../../../../domain";
import { RoomKeyEntity } from "../../../persistence";

export class RoomKeyObtainedMessagePublisher extends RoomKeyObtainedEventPublisher{

    constructor(
        @Inject('RESERVE_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    emit<Result = any, Input = RoomKeyEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}
