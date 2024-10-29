import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(320)
  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
    example: 'josh@mail.com',
  })
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    example: 'josh',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    example: 'josh1234',
  })
  password: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({
    description: 'First name',
    type: String,
    required: false,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  @ApiProperty({
    description: 'Last name',
    type: String,
    required: false,
  })
  lastName?: string;
}

export class LogInDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(320)
  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
    example: 'josh@mail.com',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    example: 'josh1234',
  })
  password: string;
}

export class LogInResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    type: String,
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5YzhiYmQyLTI2ODUtNDE0MC1iM2QyLWNjNzc1YjAyMmU5YiIsImlhdCI6MTczMDIyMDM4NiwiZXhwIjoxNzMwMjIxMjg2fQ.iRie7iDAb5o0ORVZ6K8PO9xBn5AEv6K_j9ogtADRBiM',
  })
  accessToken: string;
}
