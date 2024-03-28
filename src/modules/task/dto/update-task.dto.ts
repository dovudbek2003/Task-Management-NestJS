import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({
        type: String
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    companyId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    parentId: number;
}
