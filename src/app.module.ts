import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentActivityLogModule } from './modules/student-activity-log/student-activity-log.module';
import { CustomConfigModule } from './modules/config/config.module';
import { InternalServiceModule } from './modules/internal-service/internal-service.module';

@Module({
  imports: [
    CustomConfigModule,
    InternalServiceModule,
    StudentActivityLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
