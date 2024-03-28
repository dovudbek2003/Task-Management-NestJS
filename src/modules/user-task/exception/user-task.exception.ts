import { HttpException, HttpStatus } from "@nestjs/common";

export class UserTaskNotFounException extends HttpException {
    constructor() {
        super("user task not found", HttpStatus.NOT_FOUND)
    }
}

export class UserTaskBadRequest extends HttpException {
    constructor() {
        super("user-task cannot be changed from done status to process status", HttpStatus.BAD_REQUEST)
    }
}

export class UserTaskBadRequestCompanyIdException extends HttpException {
    constructor() {
        super('Copman_id of user and task do not match', HttpStatus.BAD_REQUEST)
    }
}

export class UserTaskCreatedBadRequest extends HttpException {
    constructor() {
        super('user and task not found', HttpStatus.BAD_REQUEST)
    }
}

export class UserTaskStatusBadRequest extends HttpException {
    constructor() {
        super('already has task took status', HttpStatus.BAD_REQUEST)
    }
}

export class UserTaskDeleteBadRequestException extends HttpException{
    constructor(){
        super('company has no such user_task', HttpStatus.BAD_REQUEST)
    }
}