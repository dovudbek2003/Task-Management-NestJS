import { ID } from "src/common/types/type"
import { CreateCompanyDto } from "../dto/create-company.dto"
import { UpdateCompanyDto } from "../dto/update-company.dto"
import { ResData } from "src/lib/resData"
import { Company } from "../entities/company.entity"
import { User } from "src/modules/user/entities/user.entity"

export interface ICompanyService {
    create(createCompanyDto: CreateCompanyDto): Promise<ResData<Company>>

    findAll(): Promise<ResData<Array<Company>>>

    getMyCompany(id: ID, currentUser: User): Promise<ResData<Company>>

    findOne(id: ID): Promise<ResData<Company>>

    findByName(name: string): Promise<Company | undefined>

    update(id: ID, updateCompanyDto: UpdateCompanyDto): Promise<ResData<Company>>

    remove(id: ID): Promise<ResData<Company>>
}