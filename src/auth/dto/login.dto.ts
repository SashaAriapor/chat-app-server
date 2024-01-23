import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "test@gmail.com",
    required: true
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "password",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
