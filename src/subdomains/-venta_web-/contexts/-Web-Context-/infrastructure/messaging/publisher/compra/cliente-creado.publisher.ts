import { Inject, Injectable } from "@nestjs/common";
import { ClienteCreadoEventPublisher } from "../../../../domain";
import { IEventPublisher } from "src/libs";
import { ClientProxy } from "@nestjs/microservices";
import { ClienteMySqlEntity } from "../../../persistence";
import { lastValueFrom } from "rxjs";


@Injectable()
export class CreateClientePublisher extends ClienteCreadoEventPublisher {
    constructor(@Inject('VENTAS_WEB_CONTEXT') private readonly proxy: ClientProxy) {
        super(proxy as unknown as IEventPublisher);
    }


    emit<Result = any, Input = ClienteMySqlEntity>(
        pattern: any,
        data: Input,
    ): Promise<Result> {
        return lastValueFrom<Result>(this.proxy.emit(pattern, data));
    }
}