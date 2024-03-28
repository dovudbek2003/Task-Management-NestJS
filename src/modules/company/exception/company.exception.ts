import { HttpException, HttpStatus } from "@nestjs/common";

export class CompanyNotFoundException extends HttpException {
    constructor() {
        super("company not found", HttpStatus.NOT_FOUND)
    }
}

export class CompanyAlreadyExistException extends HttpException {
    constructor() {
        super("company already exist", HttpStatus.BAD_REQUEST)
    }
}