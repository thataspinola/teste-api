import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Controle } from '../entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Veiculo } from '@/veiculo/entities/veiculo.entity'
import { CreateControleDto } from '../dtos/create-controle.dto'
import { UpdateControleDto } from '../dtos/update-controle.dto'

@Injectable()
export class ControleService {
  constructor(
    @InjectRepository(Controle)
    private readonly repository: Repository<Controle>,
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
  ) {}

  async getEntriesAndExits(estabelecimentoId: number) {
    return this.repository.find({
      where: { estabelecimentoId },
      relations: ['veiculo'],
    })
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['veiculo', 'estabelecimento'],
    })
  }

  async registerEntryOrExit(createControleDto: CreateControleDto) {
    const estabelecimento = await this.estabelecimentoRepository.findOneBy({
      id: createControleDto.estabelecimentoId,
    })
    const veiculo = await this.veiculoRepository.findOneBy({
      id: createControleDto.veiculoId,
    })

    if (!estabelecimento || !veiculo) {
      throw new Error('Estabelecimento ou veículo não encontrado')
    }

    const controle = this.repository.create(createControleDto)
    return this.repository.save(controle)
  }

  async update(id: number, updateControleDto: UpdateControleDto) {
    await this.repository.update(id, updateControleDto)
    return this.findOne(id)
  }
}
