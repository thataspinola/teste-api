import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { EstabelecimentoService } from '../services/estabelecimento.service'
import { CreateEstabelecimentoDto } from '../dtos/create-estabelecimento.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Estabelecimento')
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(private readonly service: EstabelecimentoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os estabelecimentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estabelecimentos retornada com sucesso.',
  })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um estabelecimento pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento encontrado.' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo estabelecimento' })
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento criado com sucesso.',
  })
  create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.service.create(createEstabelecimentoDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um estabelecimento existente' })
  @ApiParam({ name: 'id', description: 'ID do estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento atualizado com sucesso.',
  })
  update(
    @Param('id') id: string,
    @Body() updateEstabelecimentoDto: CreateEstabelecimentoDto,
  ) {
    return this.service.update(+id, updateEstabelecimentoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um estabelecimento' })
  @ApiParam({ name: 'id', description: 'ID do estabelecimento' })
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento excluído com sucesso.',
  })
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
