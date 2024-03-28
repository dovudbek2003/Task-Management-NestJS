import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTaskDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    @IsNotEmpty()
    companyId: number;

    @ApiPropertyOptional({
        type: Number
    })
    @IsOptional()
    @IsInt()
    parentId: number;
}