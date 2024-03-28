import { ID } from "src/common/types/type"
import { CreateTaskDto } from "../dto/create-task.dto";

export class Task {
    id: ID;
    title: string;
    description: string;
    company_id: number;
    parent_id: number;
    day: string;
    created_at: string;
    last_updated_at: string;
    created_by: number;
    last_updated_by: number;

    constructor(dto: CreateTaskDto) {
        this.title = dto.title;
        this.description = dto.description;
        this.company_id = dto.companyId;
        this.parent_id = dto.parentId;
    }
}
