import { ID } from "src/common/types/type";
import { UserTask } from "../entities/user-task.entity";
import { IUserAndTaskData } from "./user-task.service";

export interface IUserTaskRepository {
    insert(dto: UserTask): Promise<UserTask>
    findById(id: ID): Promise<UserTask>
    findByTaskId(taskId: ID): Promise<Array<IUserAndTaskData>>
    findByUserId(userId: ID): Promise<Array<IUserAndTaskData>>
    update(dto: UserTask, id: ID): Promise<UserTask>
    remove(id: ID, userId:ID): Promise<Array<IUserAndTaskData>>
}