import { IsStrongPassword, IsUUID } from 'class-validator';
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
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFiYjgzNWMzLTBmNDQtNDI0NC1iMjJiLTM0ZjIzNjhhMDQ5NSIsImlhdCI6MTcxMzk5MTY4MiwiZXhwIjoxNzE0MDA2MDgyfQ.pgHWOhGqshIogdkTMmQf2j8NVqR-u7Km-owHHdjxZZw',
  })
  access_token: string;
}

export class LoginDto {
  @ApiProperty({ name: 'password', type: 'string', example: 'ABCabc123@' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ name: 'mobile', type: 'number', example: '1234567890' })
  @IsMobilePhone()
  mobile: string;
}

export class SignUpDto extends LoginDto {
  @ApiProperty({ name: 'vaaghu', type: 'string', example: 'Vaaghu' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;
}
