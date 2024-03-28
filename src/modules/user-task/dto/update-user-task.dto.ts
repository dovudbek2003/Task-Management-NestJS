import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/common/enums/enum';

export class UpdateUserTaskDto {
    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
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

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    endAt: string

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    startedDate: string

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    endedDate: string;

    @ApiPropertyOptional({
        type: String,
        enum: StatusEnum
    })
    @IsOptional()
    @IsEnum(StatusEnum)
    @IsNotEmpty()
    status: StatusEnum;
}
