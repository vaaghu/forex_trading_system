import { IsNumber, IsString, Min } from 'class-validator';

export class TopupDto {
  @IsString()
  currency: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
