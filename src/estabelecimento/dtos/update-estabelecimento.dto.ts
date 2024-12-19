import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator'

export class UpdateEstabelecimentoDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nome?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cnpj?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  endereco?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  telefone?: string

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  vagasMotos?: number

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  vagasCarros?: number
}
