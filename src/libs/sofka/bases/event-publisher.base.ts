import { IEventPublisher } from '../interface/event-publisher.interface';

/**
 * Abstract class representing an event publisher
 *
 * @export
 * @abstract
 * @class EventPublisherBase
 * @template Response Type of response published
 */
export abstract class EventPublisherBase<Response> implements IEventPublisher {
  /**
   * Response to the event publisher's request
   *
   * @private
   * @type {(Response | Response[] | null)}
   * @memberof EventPublisherBase
   */
  private _response: Response | Response[] | null;

  /**
   * Creates an instance of EventPublisherBase
   *
   * @param {(Response | Response[] | null)} response Response to the event publisher's request
   * @memberof EventPublisherBase
   */
  constructor(private readonly eventPublisher: IEventPublisher) {}

  /**
   * Gets the response to the event publisher's request
   *
   * @type {(Response | Response[] | null)}
   * @memberof EventPublisherBase
   */
  get response(): Response | Response[] | null {
    return this._response;
  }

  /**
   * Sets the response to the event publisher's request
   *
   * @memberof EventPublisherBase
   */
  set response(value: Response | Response[] | null) {
    this._response = value;
  }

  send<Result, Input = Response>(pattern: any, data: Input): Promise<Result> {
    return this.eventPublisher.send(pattern, data);
  }

  emit<Result = any, Input = Response>(
    pattern: any,
    data: Input,
  ): Promise<Result> {
    return this.eventPublisher.emit(pattern, data);
  }

  /**
   * Publishes the event to its subscribers
   *
   * @abstract
   * @memberof EventPublisherBase
   */
    abstract publish<Result = any>(): Promise<Result>;
}
