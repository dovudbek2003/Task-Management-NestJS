import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyRepository } from './interfaces/company.repository';
import { ICompanyService } from './interfaces/company.service';
import { ResData } from 'src/lib/resData';
import { Company } from './entities/company.entity';
import { ID } from 'src/common/types/type';
import { CompanyAlreadyExistException, CompanyNotFoundException } from './exception/company.exception';
import { User } from '../user/entities/user.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(@Inject("ICompanyRepository") private readonly repository: ICompanyRepository) { }

  @Auth(RoleEnum.SUPER_ADMIN)
  async create(createCompanyDto: CreateCompanyDto): Promise<ResData<Company>> {
    const foundCompany = await this.findByName(createCompanyDto.name)
    if (foundCompany) {
      throw new CompanyAlreadyExistException()
    }

    const newCompany = new Company(createCompanyDto)
    const createdCompany = await this.repository.insert(newCompany)

    const resData = new ResData("create", 201, createdCompany)
    return resData
  }

  @Auth(RoleEnum.SUPER_ADMIN)
  async findAll(): Promise<ResData<Company[]>> {
    const companys = await this.repository.findAll()

    const resData = new ResData("get all", 200, companys)
    return resData
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  async getMyCompany(id: ID, currentUser: User): Promise<ResData<Company>> {
    let foundCompany: Company;
    if (currentUser.role !== RoleEnum.SUPER_ADMIN) {
      foundCompany = await this.repository.findOneById(currentUser.company_id)
    } else {
      foundCompany = await this.repository.findOneById(id)
    }

    if (!foundCompany) {
      throw new CompanyNotFoundException()
    }

    const resData = new ResData("get one", 200, foundCompany)
    return resData
  }

  async findOne(id: ID): Promise<ResData<Company>> {
    const foundCompany = await this.repository.findOneById(id)
    if (!foundCompany) {
      throw new CompanyNotFoundException()
    }

    const resData = new ResData("get one", 200, foundCompany)
    return resData
  }

  async findByName(name: string): Promise<Company> {
    return this.repository.findByName(name)
  }

  @Auth(RoleEnum.SUPER_ADMIN)
  async update(id: ID, updateCompanyDto: UpdateCompanyDto): Promise<ResData<Company>> {
    const { data: foundCompany } = await this.findOne(id)

    foundCompany.name = updateCompanyDto.name

    const updateData = new ResData("update", 200, foundCompany)
    return updateData
  }

  @Auth(RoleEnum.SUPER_ADMIN)
  async remove(id: ID): Promise<ResData<Company>> {
    await this.findOne(id)

    const deleteData = await this.repository.remove(id)

    const resData = new ResData("delete", 200, deleteData)
    return resData
  }
}
