import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateContactDto {
  @ApiProperty({
    example: 'firstname',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(16)
  firstname: string;

  @ApiProperty({
    example: 'lastname',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  lastname: string;

  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  contactMail: string;
}
