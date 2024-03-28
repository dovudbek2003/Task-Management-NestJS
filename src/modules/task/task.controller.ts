import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITaskService } from './interfaces/task.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ICompanyService } from '../company/interfaces/company.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    @Inject("ITaskService") private readonly taskService: ITaskService,
    @Inject("ICompanyService") private readonly companyService: ICompanyService) { }

  // CREATE
  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() currentUser: User) {
    if (createTaskDto.companyId) {
      await this.companyService.findOne(createTaskDto.companyId)
    }
    return this.taskService.create(createTaskDto, currentUser);
  }

  // READE
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll(@CurrentUser() currentUser: User) {
    if (currentUser.role === RoleEnum.SUPER_ADMIN) {
      return this.taskService.findAll();
    }
    return this.taskService.getByCompanyId(currentUser.company_id)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.MANAGER)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() currentUser: User) {
    if (updateTaskDto.companyId) {
      await this.companyService.findOne(updateTaskDto.companyId)
    }
    return this.taskService.update(id, updateTaskDto, currentUser);
  }

  // DELETE
  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
