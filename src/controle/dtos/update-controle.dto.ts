import { IsOptional, IsInt, IsString } from 'class-validator'

export class UpdateControleDto {
  @IsInt()
  @IsOptional()
  estabelecimentoId?: number

  @IsInt()
  @IsOptional()
  veiculoId?: number

  @IsString()
  @IsOptional()
  tipo?: 'entrada' | 'saida'
}
