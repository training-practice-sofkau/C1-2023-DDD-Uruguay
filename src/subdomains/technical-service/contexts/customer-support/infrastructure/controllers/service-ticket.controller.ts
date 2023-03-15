import { Body, Controller, Post } from "@nestjs/common";
import { SupportTicketService } from '../persistence/services';

import { 
    SupportTicketClosedPublisher,   
    NewSupportTicketAddedPublisher

} from "../messaging";

import { OpenNewTicketUseCase, CloseSupportTicketUseCase } from "../../application";

import { CloseTicketCommand, OpenNewTicketCommand} from "../utils/commands";

@Controller('support-ticket')
export class SupportTicketController {

    constructor(
        private readonly supportTicketService: SupportTicketService,
        private readonly newTicketAddedEventPublisherBase: NewSupportTicketAddedPublisher,
        private readonly supportTicketClosedEventPublisherBase: SupportTicketClosedPublisher,
        
    ){}

    // Get HTTP petition to creates a new Support Ticket
    @Post('/create-ticket')
    async createTicket(@Body() command: OpenNewTicketCommand) {
        const useCase = new OpenNewTicketUseCase(
            this.supportTicketService,
            this.newTicketAddedEventPublisherBase,
        );
        return await useCase.execute(command);
    }    

    // Get HTTP petition to Close an Support ticket
    @Post('/close-ticket')
    async closeTicket(@Body() command: CloseTicketCommand) {
        const useCase = new CloseSupportTicketUseCase(
            this.supportTicketService,
            this.supportTicketClosedEventPublisherBase,
        );
        return await useCase.execute(command);
    }    

   
    
}