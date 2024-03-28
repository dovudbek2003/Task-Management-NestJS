import { ResData } from "src/lib/resData";
import { User } from "src/modules/user/entities/user.entity";
import { LoginDto } from "../dto/login.dto";

export interface ILoginData {
    user: User;
    token: string;
}

export interface IAuthService {
    login(dto: LoginDto):Promise<ResData<ILoginData>>
}