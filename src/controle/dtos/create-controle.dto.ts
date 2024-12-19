import { IsNotEmpty, IsInt, IsString } from 'class-validator'

export class CreateControleDto {
  @IsInt()
  @IsNotEmpty()
  estabelecimentoId: number

  @IsInt()
  @IsNotEmpty()
  veiculoId: number

  @IsString()
  @IsNotEmpty()
  tipo: 'entrada' | 'saida'
}
