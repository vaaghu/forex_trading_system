import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class AuthResponse {
  @IsUUID()
  @ApiProperty({
    name: 'access_token',
    type: 'string',
    description: 'jwt toket for users',
  })
  access_token: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsMobilePhone()
  mobile: string;
}

export class SignUpDto extends LoginDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
