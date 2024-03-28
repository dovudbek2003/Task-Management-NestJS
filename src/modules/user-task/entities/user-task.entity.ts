import { ID } from "src/common/types/type"
import { CreateUserTaskDto } from "../dto/create-user-task.dto";

export class UserTask {
    id: ID;
    user_id: ID;
    task_id: ID;
    start_at: string;
    end_at: string;
    started_date: string;
    ended_date: string;
    status: string;
    created_at: string;
    last_updated_at: string;
    created_by: ID;
    last_updated_by: ID

    constructor(dto: CreateUserTaskDto) {
        this.user_id = dto.userId;
        this.task_id = dto.taskId;
        this.start_at = dto.startAt;
        this.end_at = dto.endAt;
    }
}
