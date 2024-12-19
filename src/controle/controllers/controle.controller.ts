import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common'
import { ControleService } from '../services/controle.service'
import { CreateControleDto } from '../dtos/create-controle.dto'
import { UpdateControleDto } from '../dtos/update-controle.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Controle')
@Controller('controle')
export class ControleController {
  constructor(private readonly service: ControleService) {}

  @Get('estabelecimento/:id')
  @Get('estabelecimento/:id')
  @ApiOperation({ summary: 'Listar entradas e saídas de um estabelecimento' })
  @ApiParam({ name: 'id', description: 'ID do estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de entradas e saídas retornada com sucesso.',
  })
  getEntriesAndExits(@Param('id') estabelecimentoId: string) {
    return this.service.getEntriesAndExits(+estabelecimentoId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um registro de controle pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do registro de controle' })
  @ApiResponse({ status: 200, description: 'Registro de controle encontrado.' })
  @ApiResponse({
    status: 404,
    description: 'Registro de controle não encontrado.',
  })
  getControleById(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post()
  @ApiOperation({ summary: 'Registrar uma entrada ou saída de veículo' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  registerEntryOrExit(@Body() createControleDto: CreateControleDto) {
    return this.service.registerEntryOrExit(createControleDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um registro de controle existente' })
  @ApiParam({ name: 'id', description: 'ID do registro de controle' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Registro de controle não encontrado.',
  })
  updateControle(
    @Param('id') id: string,
    @Body() updateControleDto: UpdateControleDto,
  ) {
    return this.service.update(+id, updateControleDto)
  }
}
