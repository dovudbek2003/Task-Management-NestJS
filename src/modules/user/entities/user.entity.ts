import { RoleEnum } from "src/common/enums/enum";
import { ID } from "src/common/types/type";
import { CreateUserDto } from "../dto/create-user.dto";

export class User {
    id: ID;
    login: string;
    password: string;
    full_name: string;
    company_id: number;
    role: RoleEnum;
    created_at: any;
    last_updated_at: any;
    created_by: number;
    last_updated_by: number;

    constructor(createUserDto: CreateUserDto) {
        this.login = createUserDto.login;
        this.password = createUserDto.password;
        this.full_name = createUserDto.fullName;
        this.company_id = createUserDto.companyId;
        this.role = createUserDto.role;
        // this.created_at = createUserDto.createdAt;
        // this.last_updated_at = createUserDto.lastUpdatedAt;
        // this.created_by = createUserDto.createdBy;
        // this.last_updated_by = createUserDto.lastUpdatedBy;
    }
}

