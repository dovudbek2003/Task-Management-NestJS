import { Inject, Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { IUserTaskRepository } from './interfaces/user-task.repository';
import { IUserAndTaskData, IUserTaskService } from './interfaces/user-task.service';
import { ResData } from 'src/lib/resData';
import { UserTask } from './entities/user-task.entity';
import { User } from '../user/entities/user.entity';
import { ID } from 'src/common/types/type';
import { UserTaskBadRequest, UserTaskNotFounException } from './exception/user-task.exception';
import { currentDate } from 'src/lib/current-date';
import { StatusEnum } from 'src/common/enums/enum';

@Injectable()
export class UserTaskService implements IUserTaskService {
  constructor(@Inject("IUserTaskRepository") private readonly repository: IUserTaskRepository) { }

  // CREATE
  async create(createUserTaskDto: CreateUserTaskDto, currentUser: User): Promise<ResData<UserTask>> {
    const newUserTask = new UserTask(createUserTaskDto)
    newUserTask.created_by = currentUser.id
    newUserTask.created_at = currentDate()
    if (createUserTaskDto.startAt) {
      newUserTask.start_at = createUserTaskDto.startAt
    } else {
      newUserTask.start_at = currentDate()
    }


    const createUserTask = await this.repository.insert(newUserTask)

    const resData = new ResData<UserTask>("create", 201, createUserTask)
    return resData
  }


  // READE
  async findOne(id: ID): Promise<ResData<UserTask>> {
    const foundUserTask = await this.repository.findById(id)
    if (!foundUserTask) {
      throw new UserTaskNotFounException()
    }

    const resData = new ResData<UserTask>("get one", 200, foundUserTask)
    return resData
  }

  async getByUserId(userId: ID): Promise<ResData<Array<IUserAndTaskData>>> {
    const foundUserTaskbyUserId = await this.repository.findByUserId(userId)
    if (!foundUserTaskbyUserId.length) {
      throw new UserTaskNotFounException()
    }

    const resData = new ResData("get user_task by userId", 200, foundUserTaskbyUserId)
    return resData
  }

  async getByTaskId(taskId: ID): Promise<ResData<Array<IUserAndTaskData>>> {
    const foundUserTaskbyTaskId = await this.repository.findByTaskId(taskId)
    if (!foundUserTaskbyTaskId.length) {
      throw new UserTaskNotFounException()
    }

    const resData = new ResData("get user_task by taskId", 200, foundUserTaskbyTaskId)
    return resData
  }


  // UPDATE
  async update(id: ID, updateUserTaskDto: UpdateUserTaskDto, currentUser: User): Promise<ResData<UserTask>> {
    const { data: foundUserTask } = await this.findOne(id)

    foundUserTask.user_id = updateUserTaskDto.userId ? updateUserTaskDto.userId : foundUserTask.user_id;
    foundUserTask.task_id = updateUserTaskDto.taskId ? updateUserTaskDto.taskId : foundUserTask.task_id;
    foundUserTask.start_at = updateUserTaskDto.startAt ? updateUserTaskDto.startAt : foundUserTask.start_at;
    foundUserTask.end_at = updateUserTaskDto.endAt ? updateUserTaskDto.endAt : foundUserTask.end_at;
    foundUserTask.started_date = updateUserTaskDto.startedDate ? updateUserTaskDto.startedDate : foundUserTask.started_date;
    foundUserTask.ended_date = updateUserTaskDto.endedDate ? updateUserTaskDto.endedDate : foundUserTask.ended_date;

    if (foundUserTask.status === StatusEnum.DONE && updateUserTaskDto.status === StatusEnum.PROCESS) {
      throw new UserTaskBadRequest()
    }

    foundUserTask.status = updateUserTaskDto.status ? updateUserTaskDto.status : foundUserTask.status;
    foundUserTask.last_updated_at = currentDate();
    foundUserTask.last_updated_by = currentUser.id;

    const updateUserTask = await this.repository.update(foundUserTask, id)

    const resData = new ResData<UserTask>("update", 200, updateUserTask)
    return resData
  }


  // DELETE
  async remove(id: ID, userId: ID): Promise<ResData<Array<IUserAndTaskData>>> {
    await this.findOne(id)

    const deleteUserTask = await this.repository.remove(id, userId)

    const resData = new ResData("delete", 200, deleteUserTask)
    return resData
  }
}
