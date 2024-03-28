import { ID } from "src/common/types/type"
import { Task } from "../entities/task.entity"

export interface ITaskRepository {
    insert(entity: Task): Promise<Task>
    findAll(): Promise<Array<Task>>
    findOneById(id: ID): Promise<Task>
    findByCompanyId(companyId: ID): Promise<Array<Task>>
    update(id: ID, entity: Task): Promise<Task>
    remove(id: ID): Promise<Task>
}