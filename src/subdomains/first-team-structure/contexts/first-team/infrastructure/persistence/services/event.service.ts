import { EventPostgreService } from '../databases/postgres/services/event.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService extends EventPostgreService {}