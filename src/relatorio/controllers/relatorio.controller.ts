import { Controller, Get, Query } from '@nestjs/common'
import { RelatorioService } from '../services/relatorio.service'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'

@ApiTags('Relatórios')
@Controller('relatorio')
export class RelatorioController {
  constructor(private readonly service: RelatorioService) {}

  @Get('entradas-saidas')
  @ApiOperation({
    summary: 'Listar entradas e saídas de veículos por estabelecimento',
  })
  @ApiQuery({
    name: 'estabelecimentoId',
    description: 'ID do estabelecimento',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de entradas e saídas retornada com sucesso.',
  })
  getEntradasESaidas(@Query('estabelecimentoId') estabelecimentoId: string) {
    return this.service.getEntradasESaidas(+estabelecimentoId)
  }

  @Get('veiculos-por-hora')
  @ApiOperation({
    summary: 'Obter contagem de veículos por hora em um estabelecimento',
  })
  @ApiQuery({
    name: 'estabelecimentoId',
    description: 'ID do estabelecimento',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Contagem de veículos por hora retornada com sucesso.',
  })
  getVeiculosPorHora(@Query('estabelecimentoId') estabelecimentoId: string) {
    return this.service.getVeiculosPorHora(+estabelecimentoId)
  }
}
