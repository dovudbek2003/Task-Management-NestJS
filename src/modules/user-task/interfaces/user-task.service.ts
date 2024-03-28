import { ID } from "src/common/types/type"
import { CreateUserTaskDto } from "../dto/create-user-task.dto"
import { UpdateUserTaskDto } from "../dto/update-user-task.dto"
import { ResData } from "src/lib/resData"
import { UserTask } from "../entities/user-task.entity"
import { User } from "src/modules/user/entities/user.entity"
import { Task } from "src/modules/task/entities/task.entity"

export interface IUserAndTaskData {
    id: ID;
    user: User;
    task: Task;
    start_at: string;
    end_at: string;
    started_date: string;
    ended_date: string;
    status: string;
}

export interface IUserTaskService {
    create(createUserTaskDto: CreateUserTaskDto, currentUser: User): Promise<ResData<UserTask>>

    findOne(id: ID): Promise<ResData<UserTask>>

    getByUserId(userId: ID): Promise<ResData<Array<IUserAndTaskData>>>

    getByTaskId(taskId: ID): Promise<ResData<Array<IUserAndTaskData>>>

    update(id: ID, updateUserTaskDto: UpdateUserTaskDto, currentUser:User): Promise<ResData<UserTask>>

    remove(id: ID, userId:ID): Promise<ResData<Array<IUserAndTaskData>>>
}