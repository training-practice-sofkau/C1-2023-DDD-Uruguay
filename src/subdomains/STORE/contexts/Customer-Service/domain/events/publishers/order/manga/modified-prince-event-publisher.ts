import { EventPublisherBase } from "src/libs";
import { MangaDomainBase } from "../../../../entities/Order-domain/manga-domain-entity";

export class PrinceModifiedEventPublisher  <
Response = MangaDomainBase
>   extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'order-publish-event',
            JSON.stringify({ data: this.response })
        )
}
}