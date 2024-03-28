import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [UserModule],
  controllers: [CompanyController],
  providers: [
    { provide: "ICompanyService", useClass: CompanyService },
    { provide: "ICompanyRepository", useClass: CompanyRepository }
  ],
  exports: [
    { provide: "ICompanyService", useClass: CompanyService },
    { provide: "ICompanyRepository", useClass: CompanyRepository },
  ]
})
export class CompanyModule { }
