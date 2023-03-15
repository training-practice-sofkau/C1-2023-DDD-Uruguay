import { Injectable } from "@nestjs/common";
import { EventMySqlService } from "../databases/mysql/services/event.service";



@Injectable()
export class EventService extends EventMySqlService {}