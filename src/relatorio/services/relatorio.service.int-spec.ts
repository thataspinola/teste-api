import { Test, TestingModule } from '@nestjs/testing'
import { RelatorioService } from './relatorio.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Controle } from '@/controle/entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'

const mockControleRepository = {
  find: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
  })),
}

const mockEstabelecimentoRepository = {}

describe('RelatorioService', () => {
  let service: RelatorioService
  let controleRepository: Repository<Controle>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelatorioService,
        {
          provide: getRepositoryToken(Controle),
          useValue: mockControleRepository,
        },
        {
          provide: getRepositoryToken(Estabelecimento),
          useValue: mockEstabelecimentoRepository,
        },
      ],
    }).compile()

    service = module.get<RelatorioService>(RelatorioService)
    controleRepository = module.get<Repository<Controle>>(
      getRepositoryToken(Controle),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getEntradasESaidas', () => {
    it('should return a list of entries and exits for an establishment', async () => {
      const mockResult = [
        {
          id: 1,
          estabelecimentoId: 1,
          veiculoId: 1,
          tipo: 'entrada',
          timestamp: new Date(),
        },
      ]
      jest.spyOn(controleRepository, 'find').mockResolvedValue(mockResult)

      const result = await service.getEntradasESaidas(1)
      expect(result).toEqual(mockResult)
      expect(controleRepository.find).toHaveBeenCalledWith({
        where: { estabelecimentoId: 1 },
        relations: ['veiculo'],
      })
    })
  })

  describe('getVeiculosPorHora', () => {
    it('should return a count of vehicles by hour for an establishment', async () => {
      const mockQueryBuilder = controleRepository.createQueryBuilder()
      jest.spyOn(mockQueryBuilder, 'getRawMany').mockResolvedValue([
        { hora: '2024-01-01 10:00:00', quantidade: 5 },
        { hora: '2024-01-01 11:00:00', quantidade: 3 },
      ])

      const result = await service.getVeiculosPorHora(1)
      expect(result).toEqual([
        { hora: '2024-01-01 10:00:00', quantidade: 5 },
        { hora: '2024-01-01 11:00:00', quantidade: 3 },
      ])

      expect(mockQueryBuilder.select).toHaveBeenCalledWith(
        "DATE_FORMAT(controle.timestamp, '%Y-%m-%d %H:00:00')",
        'hora',
      )
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith(
        'COUNT(controle.id)',
        'quantidade',
      )
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(
        'controle.estabelecimentoId = :estabelecimentoId',
        { estabelecimentoId: 1 },
      )
      expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('hora')
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('hora', 'ASC')
    })
  })
})
