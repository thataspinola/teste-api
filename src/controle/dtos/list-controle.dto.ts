export class ListControleDto {
  id: number
  estabelecimentoId: number
  veiculoId: number
  tipo: 'entrada' | 'saida'
  timestamp: Date
}
