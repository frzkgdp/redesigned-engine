import { Module } from '@nestjs/common';
import { JobModule } from '../job.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [JobModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
