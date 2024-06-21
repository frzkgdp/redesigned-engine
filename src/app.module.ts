import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { EmployeeModule } from './core/job/employee/employee.module';
import configuration from './environment/environment';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    CoreModule,
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
