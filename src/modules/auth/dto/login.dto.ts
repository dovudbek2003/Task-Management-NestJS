import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class LoginDto {
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
}
