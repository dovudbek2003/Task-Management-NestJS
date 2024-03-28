import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskNotFoundException extends HttpException {
    constructor() {
        super("task not found", HttpStatus.NOT_FOUND)
    }
}