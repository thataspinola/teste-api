import { Controle } from '@/controle/entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Controle)
    private readonly controleRepository: Repository<Controle>,
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentoRepository: Repository<Estabelecimento>,
  ) {}

  async getEntradasESaidas(estabelecimentoId: number) {
    return this.controleRepository.find({
      where: { estabelecimentoId },
      relations: ['veiculo'],
    })
  }

  async getVeiculosPorHora(estabelecimentoId: number) {
    return this.controleRepository
      .createQueryBuilder('controle')
      .select("DATE_FORMAT(controle.timestamp, '%Y-%m-%d %H:00:00')", 'hora')
      .addSelect('COUNT(controle.id)', 'quantidade')
      .where('controle.estabelecimentoId = :estabelecimentoId', {
        estabelecimentoId,
      })
      .groupBy('hora')
      .orderBy('hora', 'ASC')
      .getRawMany()
  }
}
