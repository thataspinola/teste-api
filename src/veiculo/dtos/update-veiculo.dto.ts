import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class UpdateVeiculoDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  marca?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  modelo?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cor?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  placa?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  tipo?: string // carro ou moto
}
