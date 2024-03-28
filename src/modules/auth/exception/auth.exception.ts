import { HttpException, HttpStatus } from "@nestjs/common";

export class LoginOrPasswordWrongException extends HttpException{
    constructor(){
        super("login or password wrong", HttpStatus.BAD_REQUEST)
    }
}