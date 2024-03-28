import { ResData } from "src/lib/resData"
import { User } from "../entities/user.entity"
import { CreateUserDto } from "../dto/create-user.dto"
import { ID } from "src/common/types/type"
import { UpdateUserDto } from "../dto/update-user.dto"

export interface IUserServiceResData {
    user: User;
    token: string;
}

export interface IUserService {
    create(createUserDto: CreateUserDto, currentUser: User): Promise<ResData<IUserServiceResData>>

    findAll(): Promise<ResData<Array<User>>>

    findOne(id: ID): Promise<ResData<User>>

    findByCompanyId(companyId: ID): Promise<ResData<Array<User>>>

    findByLogin(login: string): Promise<User | undefined>

    update(id: ID, updateUserDto: UpdateUserDto, currentUser: User): Promise<ResData<User>>

    remove(id: ID, currentUser:User): Promise<ResData<User>>
}