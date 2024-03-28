import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from '../company/company.module';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';
import { config } from 'src/common/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecretKey,
      signOptions: { expiresIn: '10h' },
    })
  ],
  controllers: [UserController],
  providers: [
    { provide: "IUserService", useClass: UserService },
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "ICompanyService", useClass: CompanyService },
    { provide: "ICompanyRepository", useClass: CompanyRepository }
  ],
  exports: [
    { provide: "IUserService", useClass: UserService },
    { provide: "IUserRepository", useClass: UserRepository }
  ]
})
export class UserModule { }
