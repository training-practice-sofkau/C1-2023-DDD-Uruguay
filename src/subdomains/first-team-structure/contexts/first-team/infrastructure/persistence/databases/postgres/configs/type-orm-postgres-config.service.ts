import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm/dist";
import { ConfigService } from '@nestjs/config'
import { CoachPostgreEntity, MatchPostgreEntity, PlayerPostgreEntity, RivalPostgreEntity, StadiumPostgreEntity, TeamPostgreEntity, TrainerPostgreEntity, TrainingPostgreEntity, TrainingEquipmentPostgreEntity, TrainingFieldPostgreEntity, WorkoutPostgreEntity } from "../entities";

@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService: ConfigService) {}
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            name: connectionName,
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [CoachPostgreEntity, PlayerPostgreEntity, TeamPostgreEntity, RivalPostgreEntity, StadiumPostgreEntity, MatchPostgreEntity,
            TrainingFieldPostgreEntity, TrainingEquipmentPostgreEntity, TrainerPostgreEntity, WorkoutPostgreEntity, TrainingPostgreEntity],
            synchronize: true,
            logging: true,
        }
    }
}