import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  firstname: string;

  @IsString()
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
