import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserTaskDto {
    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    taskId: number;

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    startAt: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    endAt: string;
}