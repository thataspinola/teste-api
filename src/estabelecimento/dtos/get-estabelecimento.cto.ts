import { IsInt } from 'class-validator'

export class GetEstabelecimentoDto {
  @IsInt()
  id: number
}
