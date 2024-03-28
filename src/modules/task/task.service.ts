import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskService } from './interfaces/task.service';
import { ITaskRepository } from './interfaces/task.repository';
import { ResData } from 'src/lib/resData';
import { Task } from './entities/task.entity';
import { ID } from 'src/common/types/type';
import { TaskNotFoundException } from './exception/task.exception';
import { User } from '../user/entities/user.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { currentDate } from 'src/lib/current-date';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject("ITaskRepository") private readonly repository: ITaskRepository
  ) { }

  // CREATE
  async create(createTaskDto: CreateTaskDto, currentUser: User): Promise<ResData<Task>> {
    if (createTaskDto.parentId) {
      await this.findOne(createTaskDto.parentId)
    }

    const newTask = new Task(createTaskDto)
    newTask.created_by = currentUser.id

    if (currentUser.role !== RoleEnum.SUPER_ADMIN) {
      newTask.company_id = currentUser.company_id
    }

    const createTask = await this.repository.insert(newTask)

    const resData = new ResData<Task>("create", 201, createTask)
    return resData
  }

  // READE
  async findAll(): Promise<ResData<Task[]>> {
    const tasks = await this.repository.findAll()

    const resData = new ResData<Array<Task>>("get all", 200, tasks)
    return resData
  }

  async findOne(id: ID): Promise<ResData<Task>> {
    const foundTask = await this.repository.findOneById(id)
    if (!foundTask) {
      throw new TaskNotFoundException()
    }

    const resData = new ResData<Task>("get one task", 200, foundTask)
    return resData
  }

  async getByCompanyId(companyId: ID): Promise<ResData<Task[]>> {
    const foundTasks = await this.repository.findByCompanyId(companyId)
    if (!foundTasks.length) {
      throw new TaskNotFoundException()
    }

    const resData = new ResData<Array<Task>>("get tasks by company id", 200, foundTasks)
    return resData
  }

  // UPDATE
  async update(id: ID, updateTaskDto: UpdateTaskDto, currentUser: User): Promise<ResData<Task>> {
    if (updateTaskDto.parentId) {
      await this.findOne(updateTaskDto.parentId)
    }
    const { data: foundTask } = await this.findOne(id)

    foundTask.title = updateTaskDto.title ? updateTaskDto.title : foundTask.title;
    foundTask.description = updateTaskDto.description ? updateTaskDto.description : foundTask.description;
    if (currentUser.role === RoleEnum.SUPER_ADMIN) {
      foundTask.company_id = updateTaskDto.companyId ? updateTaskDto.companyId : foundTask.company_id
    };
    foundTask.parent_id = updateTaskDto.parentId ? updateTaskDto.parentId : foundTask.parent_id;
    foundTask.last_updated_at = currentDate();
    foundTask.last_updated_by = currentUser.id;

    const updateTask = await this.repository.update(id, foundTask)

    const resData = new ResData("update", 200, updateTask)
    return resData
  }

  // DELETE
  async remove(id: ID): Promise<ResData<Task>> {
    await this.findOne(id)

    const deleteTask = await this.repository.remove(id)

    const resData = new ResData<Task>("delete", 200, deleteTask)
    return resData
  }
}
