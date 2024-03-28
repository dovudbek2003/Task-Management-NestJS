import { Inject, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService, IUserServiceResData } from './interfaces/user.service';
import { ResData } from 'src/lib/resData';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository';
import { hash } from 'src/lib/bcrypt';
import { ID } from 'src/common/types/type';
import { UserAlreadyExistException, UserBadRequestException, UserNotFoundException } from './exception/user.exception';
import { RoleEnum } from 'src/common/enums/enum';
import { JwtService } from '@nestjs/jwt';
import { currentDate } from 'src/lib/current-date';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject("IUserRepository") private readonly repository: IUserRepository,
    private jwtService: JwtService
  ) { }

  // CREATE
  async create(createUserDto: CreateUserDto, currentUser: User): Promise<ResData<IUserServiceResData>> {
    const foundUser = await this.findByLogin(createUserDto.login)
    if (foundUser) {
      throw new UserAlreadyExistException()
    }

    const newUser = new User(createUserDto)

    newUser.password = await hash(createUserDto.password)
    newUser.created_by = currentUser.id
    newUser.created_at = currentDate()
    if (currentUser.role !== RoleEnum.SUPER_ADMIN) {
      newUser.company_id = currentUser.company_id
    }

    const createdUser = await this.repository.insert(newUser)
    const token = await this.jwtService.signAsync({ id: createdUser.id })

    const resData = new ResData("create", 201, { user: createdUser, token })
    return resData
  }

  // READE
  async findAll(): Promise<ResData<User[]>> {
    const users = await this.repository.findAll()

    const resData = new ResData("get all", 200, users)
    return resData
  }

  async findOne(id: ID): Promise<ResData<User>> {
    const foundUser = await this.repository.findOneById(id)
    if (!foundUser) {
      throw new UserNotFoundException()
    }

    const resData = new ResData("get one", 200, foundUser)
    return resData
  }

  async findByCompanyId(companyId: number): Promise<ResData<User[]>> {
    const users = await this.repository.findByCompanyId(companyId)
    if (!users.length) {
      throw new UserNotFoundException()
    }

    const resData = new ResData("get all users company id", 200, users)
    return resData
  }

  async findByLogin(login: string) {
    return await this.repository.findByLogin(login)
  }

  // UPDATE
  async update(id: ID, updateUserDto: UpdateUserDto, currentUser: User): Promise<ResData<User>> {
    const { data: foundUser } = await this.findOne(id)

    foundUser.login = updateUserDto.login;
    foundUser.password = updateUserDto.password;
    foundUser.full_name = updateUserDto.fullName;
    foundUser.role = updateUserDto.role;
    foundUser.last_updated_at = currentDate();
    foundUser.last_updated_by = currentUser.id;
    foundUser.last_updated_by = currentUser.id;
    if (currentUser.role === RoleEnum.SUPER_ADMIN) {
      foundUser.company_id = updateUserDto.companyId;
    } else {
      foundUser.company_id = currentUser.company_id;
    }

    const updatedUser = await this.repository.update(id, foundUser)

    const resData = new ResData("update", 200, updatedUser)
    return resData
  }

  // DELETE
  async remove(id: ID, currentUser: User): Promise<ResData<User>> {
    const { data: foundUser } = await this.findOne(id)

    if (!currentUser.company_id && currentUser.role !== RoleEnum.SUPER_ADMIN) {
      throw new UserBadRequestException()
    }

    if (currentUser.role !== RoleEnum.SUPER_ADMIN && currentUser.company_id !== foundUser.company_id) {
      throw new UserBadRequestException()
    }

    const deleteUser = await this.repository.remove(id)

    const resData = new ResData<User>("delete", 200, deleteUser)
    return resData
  }
}
