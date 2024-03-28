import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor() {
        super("user not found", HttpStatus.NOT_FOUND)
    }
}

export class UserAlreadyExistException extends HttpException {
    constructor() {
        super("user already exist", HttpStatus.BAD_REQUEST)
    }
}

export class UserBadRequestException extends HttpException {
    constructor() {
        super("You are not allowed to delete this user", HttpStatus.BAD_REQUEST)
    }
}

export class UserRoleBadRequestException extends HttpException {
    constructor() {
        super("admin cannot create superAdmin", HttpStatus.BAD_REQUEST)
    }
}