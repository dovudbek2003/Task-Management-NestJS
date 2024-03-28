import { ID } from "src/common/types/type"
import { CreateUserDto } from "../dto/create-user.dto"
import { User } from "../entities/user.entity"
import { UpdateUserDto } from "../dto/update-user.dto"

export interface IUserRepository {
    insert(entity: User): Promise<User>
    findAll(): Promise<Array<User>>
    findOneById(id: ID): Promise<User>
    findByLogin(login: string): Promise<User>
    findByCompanyId(companyId: ID): Promise<Array<User>>
    update(id: ID, entity: User): Promise<User>
    remove(id: ID): Promise<User>
}