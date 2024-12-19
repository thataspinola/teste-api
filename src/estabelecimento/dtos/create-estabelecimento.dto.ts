import { IsNotEmpty, IsInt, IsString } from 'class-validator'

export class CreateEstabelecimentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string

  @IsString()
  @IsNotEmpty()
  cnpj: string

  @IsString()
  @IsNotEmpty()
  endereco: string

  @IsString()
  @IsNotEmpty()
  telefone: string

  @IsInt()
  @IsNotEmpty()
  vagasMotos: number

  @IsInt()
  @IsNotEmpty()
  vagasCarros: number
}
