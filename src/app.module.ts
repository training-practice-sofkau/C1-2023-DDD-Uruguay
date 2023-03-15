import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PostgreSQLModule } from './subdomains/first-team-structure/contexts/first-team/infrastructure/persistence/databases/postgres/postgresql.module';
import { PersistenceModule } from './subdomains/first-team-structure/contexts/first-team/infrastructure/persistence/persistence.module';
import { FirstTeamModule } from './subdomains/first-team-structure/contexts/first-team/infrastructure/first-team.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'environments', `.env.${process.env.SCOPE.trimEnd()}`)
      // envFilePath: '../environments/.env.dev',

    }),
    FirstTeamModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
