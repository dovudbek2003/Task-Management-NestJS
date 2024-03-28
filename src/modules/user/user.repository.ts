import { Postgres } from "src/lib/pg";
import { IUserRepository } from "./interfaces/user.repository";
import { User } from "./entities/user.entity";
import { ID } from "src/common/types/type";

export class UserRepository extends Postgres implements IUserRepository {
    async insert(entity: User): Promise<User> {
        return this.fetch<User, string | number>(
            `insert into users(login, password, full_name, company_id, role, created_by) values($1, $2, $3, $4, $5, $6) returning *`,
            entity.login,
            entity.password,
            entity.full_name,
            entity.company_id,
            entity.role,
            entity.created_by
        )
    }

    async findAll(): Promise<User[]> {
        return this.fetchAll<User>(
            `select * from users`
        )
    }

    async findOneById(id: ID): Promise<User> {
        return this.fetch<User, ID>(
            `select * from users where id = $1`,
            id
        )
    }

    async findByLogin(login: string): Promise<User> {
        return this.fetch<User, string>(
            `select * from users where login = $1`,
            login
        )
    }

    async findByCompanyId(companyId: ID): Promise<User[]> {
        return this.fetchAll<User, ID>(
            `select * from users where company_id = $1`,
            companyId
        )
    }

    async update(id: ID, entity: User): Promise<User> {
        return this.fetch<User, string | number>(
            `update users
            set login = $2, password = $3, full_name = $4, company_id = $5, role = $6, last_updated_at = $7, last_updated_by = $8
            where id = $1 returning *`,
            id,
            entity.login,
            entity.password,
            entity.full_name,
            entity.company_id,
            entity.role,
            entity.last_updated_at,
            entity.last_updated_by
        )
    }

    async remove(id: ID): Promise<User> {
        return this.fetch<User, ID>(
            `delete from users where id = $1 returning *`,
            id
        )
    }
}