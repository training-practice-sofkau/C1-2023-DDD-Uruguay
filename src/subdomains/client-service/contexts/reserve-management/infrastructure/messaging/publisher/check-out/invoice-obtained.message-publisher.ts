import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IEventPublisher } from "src/libs";
import { InvoiceObtainedEventPublisher } from "../../../../domain";
import { InvoiceEntity } from "../../../persistence";

export class InvoiceObtainedMessagePublisher extends InvoiceObtainedEventPublisher{

    constructor(
        @Inject('RESERVE_MANAGEMENT_CONTEXT') private readonly proxy: ClientProxy,
    ) {
        super(proxy as unknown as IEventPublisher);
    }

    emit<Result = any, Input = InvoiceEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}
