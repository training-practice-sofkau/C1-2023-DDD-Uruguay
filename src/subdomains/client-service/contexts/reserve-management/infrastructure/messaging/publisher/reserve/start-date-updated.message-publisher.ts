import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { StartDateUpdatedEventPublisher } from "../../../../domain";
import { ReserveEntity } from "../../../persistence";

export class StartDateUpdatedMessagePublisher extends StartDateUpdatedEventPublisher{

    constructor(
        @Inject('RESERVE_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    emit<Result = any, Input = ReserveEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}