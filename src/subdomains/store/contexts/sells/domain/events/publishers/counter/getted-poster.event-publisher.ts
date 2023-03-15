import { EventPublisherBase } from "src/libs";
import { PosterDomainEntity } from '../../../entities/poster/poster.domain-entity';

export abstract class GettedPosterEventPublisherBase<Response = PosterDomainEntity>
    extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.getted-poster',
            JSON.stringify({ data: this.response })
        )
    }
}