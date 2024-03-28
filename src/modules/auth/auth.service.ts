import { Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { LoginDto } from './dto/login.dto';
import { IUserService } from '../user/interfaces/user.service';
import { LoginOrPasswordWrongException } from './exception/auth.exception';
import { isMatch } from 'src/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject("IUserService") private readonly userService: IUserService, private jwtService: JwtService) { }

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const foundUser = await this.userService.findByLogin(dto.login)
    if (!foundUser) {
      throw new LoginOrPasswordWrongException()
    }

    if (! await isMatch(dto.password, foundUser.password)) {
      throw new LoginOrPasswordWrongException()
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id })

    const resData = new ResData<ILoginData>("success", 200, { user: foundUser, token })
    return resData
  }
}
