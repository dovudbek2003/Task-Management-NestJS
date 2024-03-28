import { Postgres } from "src/lib/pg";
import { ICompanyRepository } from "./interfaces/company.repository";
import { Company } from "./entities/company.entity";
import { ID } from "src/common/types/type";

export class CompanyRepository extends Postgres implements ICompanyRepository {
    insert(entity: Company): Promise<Company> {
        return this.fetch<Company, string>(
            `insert into companies(name) values($1) returning *`,
            entity.name
        )
    }

    findAll(): Promise<Company[]> {
        return this.fetchAll<Company>(
            `select * from companies`
        )
    }

    findOneById(id: ID): Promise<Company> {
        return this.fetch<Company, ID>(
            `select * from companies where id = $1`,
            id
        )
    }

    findByName(name: string): Promise<Company> {
        return this.fetch<Company, string>(
            `select * from companies where name = $1`,
            name
        )
    }

    update(id: ID, entity: Company): Promise<Company> {
        return this.fetch<Company, ID | string>(
            `update companies set name = $2 where id = $1 returning *`,
            id,
            entity.name
        )
    }

    remove(id: ID): Promise<Company> {
        return this.fetch<Company, number>(
            `delete from companies where id = $1 returning *`,
            id
        )
    }
}