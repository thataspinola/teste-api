import { Test, TestingModule } from '@nestjs/testing'
import { RelatorioController } from './relatorio.controller'
import { RelatorioService } from '../services/relatorio.service'

const mockRelatorioService = {
  getEntradasESaidas: jest.fn(),
  getVeiculosPorHora: jest.fn(),
}

describe('RelatorioController', () => {
  let controller: RelatorioController
  let service: RelatorioService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatorioController],
      providers: [
        {
          provide: RelatorioService,
          useValue: mockRelatorioService,
        },
      ],
    }).compile()

    controller = module.get<RelatorioController>(RelatorioController)
    service = module.get<RelatorioService>(RelatorioService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getEntradasESaidas', () => {
    it('should return a list of entries and exits', async () => {
      const mockResult = [
        {
          id: 1,
          estabelecimentoId: 1,
          veiculoId: 1,
          tipo: 'entrada',
          timestamp: new Date(),
        },
      ]
      jest.spyOn(service, 'getEntradasESaidas').mockResolvedValue(mockResult)

      const result = await controller.getEntradasESaidas('1')
      expect(result).toEqual(mockResult)
      expect(service.getEntradasESaidas).toHaveBeenCalledWith(1)
    })
  })

  describe('getVeiculosPorHora', () => {
    it('should return a count of vehicles by hour', async () => {
      const mockResult = [
        { hora: '2024-01-01 10:00:00', quantidade: 5 },
        { hora: '2024-01-01 11:00:00', quantidade: 3 },
      ]
      jest.spyOn(service, 'getVeiculosPorHora').mockResolvedValue(mockResult)

      const result = await controller.getVeiculosPorHora('1')
      expect(result).toEqual(mockResult)
      expect(service.getVeiculosPorHora).toHaveBeenCalledWith(1)
    })
  })
})
