import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { TaskModule } from './modules/task/task.module';
import { UserTaskModule } from './modules/user-task/user-task.module';

@Module({
  imports: [AuthModule, CompanyModule, UserModule, TaskModule, UserTaskModule]
})
export class AppModule { }
