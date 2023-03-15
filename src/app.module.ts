import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { MangaStoreModule } from './subdomains/Store/contexts/Customer-Service/infrastructure/mangastore.module';

@Module({
  imports: [
    MangaStoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      // envFilePath: '../environments/.env.dev' |,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
