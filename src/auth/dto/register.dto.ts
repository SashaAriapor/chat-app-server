import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "test@gmail.com",
    required: true
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "firstname",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  firstname: string;

  @ApiProperty({
    example: "lastname",
    required: false
  })
  @IsString()
  lastname?: string;

  @ApiProperty({
    example: "password",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
