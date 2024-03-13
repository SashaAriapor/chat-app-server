import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class createMessageDto {
    @ApiProperty({
        example: 'test@gmail.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    to: string;

    @ApiProperty({
        example: "Simple Message",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string
}