import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'simple bio',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  bio?: string;

  @ApiProperty({
    example: 'edited firstname',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  firstname?: string;

  @ApiProperty({
    example: 'edited lastname',
  })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  @IsEmpty()
  lastname?: string;
}
