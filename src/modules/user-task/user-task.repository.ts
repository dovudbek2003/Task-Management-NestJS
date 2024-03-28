import { Postgres } from "src/lib/pg"
import { ID } from "src/common/types/type"
import { UserTask } from "./entities/user-task.entity"
import { IUserTaskRepository } from "./interfaces/user-task.repository"
import { IUserAndTaskData } from "./interfaces/user-task.service"
import { User } from "../user/entities/user.entity"

export class UserTaskRepository extends Postgres implements IUserTaskRepository {
    async insert(dto: UserTask): Promise<UserTask> {
        return await this.fetch<UserTask, ID | string>(
            `insert into user_tasks(user_id, task_id, start_at, end_at, created_at, created_by)
            values($1, $2, $3, $4, $5, $6) returning *
            `,
            dto.user_id,
            dto.task_id,
            dto.start_at,
            dto.end_at,
            dto.created_at,
            dto.created_by
        )
    }

    async findById(id: ID): Promise<UserTask> {
        return await this.fetch<UserTask, ID>(
            `select * from user_tasks where id = $1`,
            id
        )
    }

    async findByTaskId(taskId: ID): Promise<Array<IUserAndTaskData>> {
        return await this.fetchAll<IUserAndTaskData, ID>(
            `select user_tasks.id,
            (select row_to_json(users.*) as user from users where id = user_tasks.user_id),
            (select row_to_json(tasks.*) as task from tasks where id = user_tasks.task_id),
            user_tasks.start_at,
            user_tasks.end_at,
            user_tasks.started_date,
            user_tasks.ended_date,
            user_tasks.status
            from user_tasks where task_id = $1`,
            taskId
        )
    }

    async findByUserId(userId: ID): Promise<Array<IUserAndTaskData>> {
        return await this.fetchAll<IUserAndTaskData, ID>(
            `select user_tasks.id,
            (select row_to_json(users.*) as user from users where id = user_tasks.user_id),
            (select row_to_json(tasks.*) as task from tasks where id = user_tasks.task_id),
            user_tasks.start_at,
            user_tasks.end_at,
            user_tasks.started_date,
            user_tasks.ended_date,
            user_tasks.status
            from user_tasks where user_id = $1`,
            userId
        )
    }

    async update(dto: UserTask, id: ID): Promise<UserTask> {
        return await this.fetch<UserTask, ID | string>(
            `update user_tasks
            set user_id = $2,
            task_id = $3, 
            start_at = $4, 
            end_at = $5, 
            started_date = $6, 
            ended_date = $7, 
            status = $8, 
            last_updated_at = $9, 
            last_updated_by = $10
            where id = $1 returning *
            `,
            id,
            dto.user_id,
            dto.task_id,
            dto.start_at,
            dto.end_at,
            dto.started_date,
            dto.ended_date,
            dto.status,
            dto.last_updated_at,
            dto.last_updated_by
        )
    }

    async remove(id: ID, userId: ID): Promise<Array<IUserAndTaskData>> {
        const foundUser = await this.fetch<User, ID>(
            `select * from users where id = $1`,
            userId
        )
        console.log(foundUser);

        const deleteResponsUserTask = await this.findByUserId(foundUser.id)

        await this.fetch<IUserAndTaskData, ID>(
            `delete from user_tasks where id = $1`,
            id
        )

        return deleteResponsUserTask
    }

}
