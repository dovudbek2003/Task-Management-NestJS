import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CompanyModule, UserModule],
  controllers: [TaskController],
  providers: [
    { provide: "ITaskService", useClass: TaskService },
    { provide: "ITaskRepository", useClass: TaskRepository }
  ],
  exports: [
    { provide: "ITaskService", useClass: TaskService },
    { provide: "ITaskRepository", useClass: TaskRepository }
  ]
})
export class TaskModule { }
