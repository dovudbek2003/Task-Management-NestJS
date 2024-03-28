import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { ResData } from "./resData";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        // const httpStatus =
        //     exception instanceof HttpException
        //         ? exception.getStatus()
        //         : HttpStatus.INTERNAL_SERVER_ERROR;


        // const responseBody = {
        //     statusCode: httpStatus,
        //     timestamp: new Date().toISOString(),
        //     path: httpAdapter.getRequestUrl(ctx.getRequest()),
        // };

        const responseBody = new ResData("", HttpStatus.INTERNAL_SERVER_ERROR, null, exception)

        if (exception instanceof HttpException) {
            const response: any = exception.getResponse()

            if (typeof response === "string") {
                responseBody.message = response;
                responseBody.statusCode = exception.getStatus()
            } else {
                responseBody.message = response.message;
                responseBody.statusCode = response.statusCode;
            }

        } else {
            responseBody.message = exception.message
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
    }
}