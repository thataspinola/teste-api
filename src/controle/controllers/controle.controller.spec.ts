import { Test, TestingModule } from '@nestjs/testing'
import { ControleController } from '../controllers/controle.controller'
import { ControleService } from '../services/controle.service'
import { CreateControleDto } from '../dtos/create-controle.dto'
import { UpdateControleDto } from '../dtos/update-controle.dto'

const mockService = {
  getEntriesAndExits: jest.fn(),
  findOne: jest.fn(),
  registerEntryOrExit: jest.fn(),
  update: jest.fn(),
}

describe('ControleController', () => {
  let controller: ControleController
  let service: ControleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControleController],
      providers: [
        {
          provide: ControleService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<ControleController>(ControleController)
    service = module.get<ControleService>(ControleService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getEntriesAndExits', () => {
    it('should return entries and exits for an establishment', async () => {
      const result = [
        {
          id: 1,
          estabelecimentoId: 1,
          veiculoId: 1,
          tipo: 'entrada',
          timestamp: new Date(),
        },
      ]
      jest.spyOn(service, 'getEntriesAndExits').mockResolvedValue(result)

      expect(await controller.getEntriesAndExits('1')).toEqual(result)
    })
  })

  describe('getControleById', () => {
    it('should return a single controle record', async () => {
      const result = {
        id: 1,
        estabelecimentoId: 1,
        veiculoId: 1,
        tipo: 'entrada',
        timestamp: new Date(),
      }
      jest.spyOn(service, 'findOne').mockResolvedValue(result)

      expect(await controller.getControleById('1')).toEqual(result)
    })

    it('should throw an error if no controle is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null)

      await expect(controller.getControleById('99')).rejects.toThrow()
    })
  })

  describe('registerEntryOrExit', () => {
    it('should register a new entry or exit', async () => {
      const createDto: CreateControleDto = {
        estabelecimentoId: 1,
        veiculoId: 1,
        tipo: 'entrada',
      }
      const result = { id: 1, ...createDto, timestamp: new Date() }

      jest.spyOn(service, 'registerEntryOrExit').mockResolvedValue(result)

      expect(await controller.registerEntryOrExit(createDto)).toEqual(result)
    })
  })

  describe('updateControle', () => {
    it('should update a controle record', async () => {
      const updateDto: UpdateControleDto = { tipo: 'saida' }
      const result = {
        id: 1,
        estabelecimentoId: 1,
        veiculoId: 1,
        tipo: 'saida',
        timestamp: new Date(),
      }

      jest.spyOn(service, 'update').mockResolvedValue(result)

      expect(await controller.updateControle('1', updateDto)).toEqual(result)
    })
  })
})
