import { Test, TestingModule } from '@nestjs/testing'
import { VeiculoController } from './veiculo.controller'
import { VeiculoService } from '../services/veiculo.service'
import { CreateVeiculoDto } from '../dtos/create-veiculo.dto'
import { UpdateVeiculoDto } from '../dtos/update-veiculo.dto'

const mockService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}

describe('VeiculoController', () => {
  let controller: VeiculoController
  let service: VeiculoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [
        {
          provide: VeiculoService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<VeiculoController>(VeiculoController)
    service = module.get<VeiculoService>(VeiculoService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of veiculos', async () => {
      const result = [
        {
          id: 1,
          marca: 'Toyota',
          modelo: 'Corolla',
          cor: 'Azul',
          placa: 'ABC1234',
          tipo: 'carro',
        },
      ]
      jest.spyOn(service, 'findAll').mockResolvedValue(result)

      expect(await controller.findAll()).toEqual(result)
    })
  })

  describe('findOne', () => {
    it('should return a single veiculo', async () => {
      const result = {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        cor: 'Azul',
        placa: 'ABC1234',
        tipo: 'carro',
      }
      jest.spyOn(service, 'findOne').mockResolvedValue(result)

      expect(await controller.findOne('1')).toEqual(result)
    })

    it('should throw an error if no veiculo is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null)

      await expect(controller.findOne('99')).rejects.toThrow()
    })
  })

  describe('create', () => {
    it('should create and return a new veiculo', async () => {
      const createDto: CreateVeiculoDto = {
        marca: 'Toyota',
        modelo: 'Corolla',
        cor: 'Azul',
        placa: 'DEF5678',
        tipo: 'carro',
      }
      const result = { id: 1, ...createDto }

      jest.spyOn(service, 'create').mockResolvedValue(result)

      expect(await controller.create(createDto)).toEqual(result)
    })
  })

  describe('update', () => {
    it('should update and return the updated veiculo', async () => {
      const updateDto: UpdateVeiculoDto = { cor: 'Vermelho' }
      const result = {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        cor: 'Vermelho',
        placa: 'DEF5678',
        tipo: 'carro',
      }

      jest.spyOn(service, 'update').mockResolvedValue(result)

      expect(await controller.update('1', updateDto)).toEqual(result)
    })
  })

  describe('remove', () => {
    it('should remove the veiculo by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1 })

      expect(await controller.remove('1')).toEqual({ affected: 1 })
    })

    it('should throw an error if no veiculo is removed', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ affected: 0 })

      await expect(controller.remove('99')).rejects.toThrow()
    })
  })
})
