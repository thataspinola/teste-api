import { IsInt } from 'class-validator'

export class GetVeiculoDto {
  @IsInt()
  id: number
}
