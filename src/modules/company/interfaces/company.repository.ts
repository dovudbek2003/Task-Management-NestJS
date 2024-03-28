import { ID } from "src/common/types/type"
import { Company } from "../entities/company.entity"

export interface ICompanyRepository {
    insert(entity: Company): Promise<Company>
    findAll(): Promise<Array<Company>>
    findOneById(id: ID): Promise<Company>
    findByName(name: string): Promise<Company>
    update(id: ID, entity: Company): Promise<Company>
    remove(id: ID): Promise<Company>
}