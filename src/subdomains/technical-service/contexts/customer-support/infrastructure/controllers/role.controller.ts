import { Body, Controller, Post } from "@nestjs/common";

import { RoleService } from '../persistence/services';

import { RoleDescriptionChangedPublisher, RoleCreatedPublisher } from "../messaging";

import { CreateRoleUseCase, ChangeRoleDescriptionUseCase } from "../../application";

import { CreateRoleCommand, ChangeRoleDescriptionCommand } from "../utils/commands";


@Controller('role')
export class RoleController {

    constructor(
        private readonly roleService: RoleService,
        private readonly roleCreatedEventPublisherBase: RoleCreatedPublisher,
        private readonly roleDescriptionChangedEventPublisherBase: RoleDescriptionChangedPublisher,
    ) { }


    // Get HTTP petition to Add a new Role
    @Post('/add-role')
    async addRole(@Body() command: CreateRoleCommand) {
        const useCase = new CreateRoleUseCase(
            this.roleService,
            this.roleCreatedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

    // Get HTTP petition to change description to a Role
    @Post('/change-role-description')
    async changeRoleDescription(@Body() command: ChangeRoleDescriptionCommand) {
        const useCase = new ChangeRoleDescriptionUseCase(
            this.roleService,
            this.roleDescriptionChangedEventPublisherBase,
        );
        return await useCase.execute(command);
    }

}