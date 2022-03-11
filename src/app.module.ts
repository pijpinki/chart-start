import { Module } from '@nestjs/common';
import { StatsRouter } from './routes';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, StatsRouter],
  providers: [AppService],
})
export class AppModule {}
