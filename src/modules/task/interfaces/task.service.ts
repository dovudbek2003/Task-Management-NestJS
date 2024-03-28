import { ResData } from "src/lib/resData"
import { CreateTaskDto } from "../dto/create-task.dto"
import { Task } from "../entities/task.entity"
import { ID } from "src/common/types/type"
import { UpdateTaskDto } from "../dto/update-task.dto"
import { User } from "src/modules/user/entities/user.entity"

export interface ITaskService {
    create(createTaskDto: CreateTaskDto, currentUser:User): Promise<ResData<Task>>

    findAll(): Promise<ResData<Array<Task>>>

    findOne(id: ID): Promise<ResData<Task>>

    getByCompanyId(companyId: ID): Promise<ResData<Array<Task>>>

    update(id: ID, updateTaskDto: UpdateTaskDto, currentUser:User): Promise<ResData<Task>>

    remove(id: ID): Promise<ResData<Task>>
}