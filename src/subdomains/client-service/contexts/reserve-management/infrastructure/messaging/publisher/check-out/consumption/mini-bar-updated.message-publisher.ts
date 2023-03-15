import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { MiniBarUpdatedEventPublisher } from "src/subdomains/client-service/contexts/reserve-management/domain";
import { ConsumptionEntity } from "../../../../persistence";

export class MiniBarUpdatedMessagePublisher extends MiniBarUpdatedEventPublisher{

    constructor(
        @Inject('RESERVE_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    emit<Result = any, Input = ConsumptionEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}
