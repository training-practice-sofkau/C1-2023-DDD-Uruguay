import { EventPublisherBase } from "src/libs";
import { ProductDomainEntity } from '../../../entities/product/product.domain-entity';

export abstract class GettedProductEventPublisherBase<Response = ProductDomainEntity>
    extends EventPublisherBase<Response> {
    publish<Result = any>(): Promise<Result> {
        return this.emit(
            'store.getted-product',
            JSON.stringify({ data: this.response })
        )
    }
}