import { Postgres } from "src/lib/pg";
import { ITaskRepository } from "./interfaces/task.repository";
import { Task } from "./entities/task.entity";
import { ID } from "src/common/types/type";

export class TaskRepository extends Postgres implements ITaskRepository {
    insert(entity: Task): Promise<Task> {
        return this.fetch<Task, string | ID>(
            `insert into tasks(title, description, company_id, parent_id, created_by)
            values($1, $2, $3, $4, $5) returning *`,
            entity.title,
            entity.description,
            entity.company_id,
            entity.parent_id,
            entity.created_by
        )
    }

    findAll(): Promise<Task[]> {
        return this.fetchAll<Task>(
            `select * from tasks`
        )
    }

    findOneById(id: ID): Promise<Task> {
        return this.fetch<Task, ID>(
            `select * from tasks where id = $1`,
            id
        )
    }

    findByCompanyId(companyId: ID): Promise<Task[]> {
        return this.fetchAll<Task, ID>(
            `select * from tasks where company_id = $1`,
            companyId
        )
    }

    update(id: ID, entity: Task): Promise<Task> {
        return this.fetch<Task, string | ID>(
            `update tasks
            set title = $2, description = $3, company_id = $4, parent_id = $5, last_updated_at = $6, last_updated_by = $7
            where id = $1 returning *`,
            id,
            entity.title,
            entity.description,
            entity.company_id,
            entity.parent_id,
            entity.last_updated_at,
            entity.last_updated_by
        )
    }

    remove(id: ID): Promise<Task> {
        return this.fetch<Task, ID>(
            `delete from tasks where id = $1 returning *`,
            id
        )
    }
}