import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { IEventPublisher } from "src/libs";
import { EndDateUpdatedEventPublisher } from "../../../../domain";
import { ReserveEntity } from "../../../persistence/entities";
import { lastValueFrom } from 'rxjs';

export class EndDateUpdatedMessagePublisher extends EndDateUpdatedEventPublisher{

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
