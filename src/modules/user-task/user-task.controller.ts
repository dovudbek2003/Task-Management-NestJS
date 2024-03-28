import { Controller, Get, Post, Body, Param, Delete, Inject, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { IUserTaskService } from './interfaces/user-task.service';
import { IUserService } from '../user/interfaces/user.service';
import { ITaskService } from '../task/interfaces/task.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum, StatusEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { UserNotFoundException, UserRoleBadRequestException } from '../user/exception/user.exception';
import { UserTaskBadRequestCompanyIdException, UserTaskCreatedBadRequest, UserTaskDeleteBadRequestException, UserTaskNotFounException, UserTaskStatusBadRequest } from './exception/user-task.exception';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('user-task')
@Controller('user-task')
export class UserTaskController {
  constructor(
    @Inject("IUserTaskService") private readonly userTaskService: IUserTaskService,
    @Inject("IUserService") private readonly userService: IUserService,
    @Inject("ITaskService") private readonly taskService: ITaskService
  ) { }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Post()
  async create(@Body() createUserTaskDto: CreateUserTaskDto, @CurrentUser() currentUser: User) {
    const { data: foundUser } = await this.userService.findOne(createUserTaskDto.userId)
    const { data: foundTask } = await this.taskService.findOne(createUserTaskDto.taskId)

    if (!currentUser.company_id && currentUser.role !== RoleEnum.SUPER_ADMIN) {
      throw new UserTaskCreatedBadRequest()
    }

    if (currentUser.role === RoleEnum.SUPER_ADMIN) {
      if (foundTask.company_id !== foundUser.company_id) {
        throw new UserTaskBadRequestCompanyIdException()
      }
    } else {
      console.log("fffffoundUser", foundUser);
      console.log("foundTaskkkk", foundTask);
      console.log("skjfksf", currentUser.company_id !== foundUser.company_id);



      if (currentUser.company_id !== foundUser.company_id && foundUser.company_id !== foundTask.company_id) {
        throw new UserTaskBadRequestCompanyIdException()
      }
    }

    return this.userTaskService.create(createUserTaskDto, currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('user-id/:userId')
  async getByUserId(@Param('userId', ParseIntPipe) userId: number) {
    await this.userService.findOne(userId)
    return this.userTaskService.getByUserId(userId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get('task-id/:taskId')
  async getByTaskId(@Param('taskId', ParseIntPipe) taskId: number) {
    await this.taskService.findOne(taskId)
    return this.userTaskService.getByTaskId(taskId)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userTaskService.findOne(id);
  }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserTaskDto: UpdateUserTaskDto, @CurrentUser() currentUser: User) {
    if (updateUserTaskDto.status && updateUserTaskDto.status === StatusEnum.TOOK) {
      throw new UserTaskStatusBadRequest()
    }

    if (!currentUser.company_id && currentUser.role !== RoleEnum.SUPER_ADMIN) {
      throw new UserTaskNotFounException()
    }

    const { data: { user_id: userId, task_id: taskId } } = await this.userTaskService.findOne(id)
    const { data: foundUser } = await this.userService.findOne(userId)
    if (currentUser.company_id !== foundUser.company_id) {
      throw new UserTaskNotFounException()
    }

    if (currentUser.company_id) {
      if (updateUserTaskDto.userId && !updateUserTaskDto.taskId) {
        const { data: { task_id: taskId } } = await this.userTaskService.findOne(id)
        const { data: foundUser } = await this.userService.findOne(updateUserTaskDto.userId)
        const { data: foundTask } = await this.taskService.findOne(taskId)

        if (currentUser.company_id !== foundUser.company_id && foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }

      if (!updateUserTaskDto.userId && updateUserTaskDto.taskId) {
        const { data: { user_id: userId } } = await this.userTaskService.findOne(id)
        const { data: foundTask } = await this.taskService.findOne(updateUserTaskDto.taskId)
        const { data: foundUser } = await this.userService.findOne(userId)
        if (currentUser.company_id !== foundUser.company_id && foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }

      if (updateUserTaskDto.userId && updateUserTaskDto.taskId) {
        const { data: foundUser } = await this.userService.findOne(updateUserTaskDto.userId)
        const { data: foundTask } = await this.taskService.findOne(updateUserTaskDto.taskId)
        if (currentUser.company_id !== foundUser.company_id && foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }
    } else {
      if (updateUserTaskDto.userId && !updateUserTaskDto.taskId) {
        const { data: { task_id: taskId } } = await this.userTaskService.findOne(id)
        const { data: foundUser } = await this.userService.findOne(updateUserTaskDto.userId)
        const { data: foundTask } = await this.taskService.findOne(taskId)

        if (foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }

      if (!updateUserTaskDto.userId && updateUserTaskDto.taskId) {
        const { data: { user_id: userId } } = await this.userTaskService.findOne(id)
        const { data: foundTask } = await this.taskService.findOne(updateUserTaskDto.taskId)
        const { data: foundUser } = await this.userService.findOne(userId)
        if (foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }

      if (updateUserTaskDto.userId && updateUserTaskDto.taskId) {
        const { data: foundUser } = await this.userService.findOne(updateUserTaskDto.userId)
        const { data: foundTask } = await this.taskService.findOne(updateUserTaskDto.taskId)
        if (foundUser.company_id !== foundTask.company_id) {
          throw new UserTaskBadRequestCompanyIdException()
        }
      }
    }

    return this.userTaskService.update(id, updateUserTaskDto, currentUser);
  }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: User) {

    const { data: foundUserTask } = await this.userTaskService.findOne(id)

    const { data: foundUser } = await this.userService.findOne(foundUserTask.user_id)

    if (currentUser.role !== RoleEnum.SUPER_ADMIN && currentUser.company_id !== foundUser.company_id) {
      throw new UserTaskDeleteBadRequestException()
    }

    return this.userTaskService.remove(id, foundUser.id);
  }
}
