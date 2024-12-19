import { IsNotEmpty, IsString } from 'class-validator'

export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty()
  marca: string

  @IsString()
  @IsNotEmpty()
  modelo: string

  @IsString()
  @IsNotEmpty()
  cor: string

  @IsString()
  @IsNotEmpty()
  placa: string

  @IsString()
  @IsNotEmpty()
  tipo: string // carro ou moto
}
