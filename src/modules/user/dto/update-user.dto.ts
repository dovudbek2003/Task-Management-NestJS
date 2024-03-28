import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/enums/enum';

export class UpdateUserDto {
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({
        type: String
    })
    @IsNumberString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    companyId: number;

    @ApiProperty({
        type: String
    })
    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: RoleEnum;
}
