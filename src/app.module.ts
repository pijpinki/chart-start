import { Module } from '@nestjs/common';
import { StatsRouter, VpnRouter } from './routes';
import { AuthService } from './services';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, StatsRouter, VpnRouter],
  providers: [AppService, AuthService],
})
export class AppModule {}
