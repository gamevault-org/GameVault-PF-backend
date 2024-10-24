import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrAddCartDto {
  @IsNotEmpty()
  @IsNumber()
  product: number;
}
