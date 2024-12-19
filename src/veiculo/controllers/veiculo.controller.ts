import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { VeiculoService } from '../services/veiculo.service'
import { CreateVeiculoDto } from '../dtos/create-veiculo.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

@ApiTags('Veículo')
@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly service: VeiculoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos retornada com sucesso.',
  })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um veículo pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado com sucesso.' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.service.create(createVeiculoDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um veículo existente' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado com sucesso.' })
  update(@Param('id') id: string, @Body() updateVeiculoDto: CreateVeiculoDto) {
    return this.service.update(+id, updateVeiculoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um veículo' })
  @ApiParam({ name: 'id', description: 'ID do veículo' })
  @ApiResponse({ status: 200, description: 'Veículo excluído com sucesso.' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}
