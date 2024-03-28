import { Controller, Get, Post, Body, Param, Delete, Inject, UseGuards, Put, Query, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { ICompanyService } from '../company/interfaces/company.service';
import { UserRoleBadRequestException } from './exception/user.exception';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    @Inject("IUserService") private readonly userService: IUserService,
    @Inject("ICompanyService") private readonly companyService: ICompanyService
  ) { }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @CurrentUser() currentUser: User) {
    if(currentUser.role !== RoleEnum.SUPER_ADMIN && createUserDto.role === RoleEnum.SUPER_ADMIN){
      throw new UserRoleBadRequestException()
    }

    if (createUserDto.companyId) {
      await this.companyService.findOne(createUserDto.companyId)
    }
    return this.userService.create(createUserDto, currentUser);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'companyId',
    required: false
  })
  @Get()
  async findAll(@Query('companyId') companyId: string, @CurrentUser() currentUser: User) {

    if (currentUser.role !== RoleEnum.SUPER_ADMIN) {
      return this.userService.findByCompanyId(currentUser.company_id)
    }

    if (currentUser.role === RoleEnum.SUPER_ADMIN && !isNaN(Number(companyId))) {
      return this.userService.findByCompanyId(Number(companyId))
    }

    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: User) {
    return this.userService.update(id, updateUserDto, currentUser);
  }

  @Auth(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: User) {
    return this.userService.remove(id, currentUser);
  }
}
