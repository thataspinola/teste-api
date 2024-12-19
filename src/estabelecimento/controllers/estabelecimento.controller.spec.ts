import { Test, TestingModule } from '@nestjs/testing'
import { EstabelecimentoController } from './estabelecimento.controller'
import { EstabelecimentoService } from '../services/estabelecimento.service'
import { CreateEstabelecimentoDto } from '../dtos/create-estabelecimento.dto'

const mockService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

describe('EstabelecimentoController', () => {
  let controller: EstabelecimentoController
  let service: EstabelecimentoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstabelecimentoController],
      providers: [
        {
          provide: EstabelecimentoService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<EstabelecimentoController>(
      EstabelecimentoController,
    )
    service = module.get<EstabelecimentoService>(EstabelecimentoService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of estabelecimentos', async () => {
      const result = [{ id: 1, nome: 'Estabelecimento 1' }]
      jest.spyOn(service, 'findAll').mockResolvedValue(result)

      expect(await controller.findAll()).toBe(result)
    })
  })

  describe('findOne', () => {
    it('should return a single estabelecimento', async () => {
      const result = { id: 1, nome: 'Estabelecimento 1' }
      jest.spyOn(service, 'findOne').mockResolvedValue(result)

      expect(await controller.findOne('1')).toBe(result)
    })

    it('should throw an error if no estabelecimento is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null)

      await expect(controller.findOne('99')).rejects.toThrow()
    })
  })

  describe('create', () => {
    it('should create and return a new estabelecimento', async () => {
      const createDto: CreateEstabelecimentoDto = {
        nome: 'Estabelecimento Novo',
        cnpj: '12345678901234',
        endereco: 'Endereço Novo',
        telefone: '123456789',
        vagasMotos: 10,
        vagasCarros: 20,
      }
      const result = { id: 1, ...createDto }

      jest.spyOn(service, 'create').mockResolvedValue(result)

      expect(await controller.create(createDto)).toBe(result)
    })
  })

  describe('update', () => {
    it('should update and return the updated estabelecimento', async () => {
      const updateDto = { nome: 'Estabelecimento Atualizado' }
      const result = { id: 1, ...updateDto }

      jest.spyOn(service, 'update').mockResolvedValue(result)

      expect(await controller.update('1', updateDto)).toBe(result)
    })
  })

  describe('remove', () => {
    it('should remove the estabelecimento by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1 })

      expect(await controller.remove('1')).toEqual({ affected: 1 })
    })

    it('should throw an error if no estabelecimento is removed', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ affected: 0 })

      await expect(controller.remove('99')).rejects.toThrow()
    })
  })
})
