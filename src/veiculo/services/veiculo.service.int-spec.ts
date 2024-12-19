import { Test, TestingModule } from '@nestjs/testing'
import { VeiculoService } from './veiculo.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Veiculo } from '../entities/veiculo.entity'
import { Repository } from 'typeorm'

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('VeiculoService', () => {
  let service: VeiculoService
  let repository: Repository<Veiculo>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeiculoService,
        {
          provide: getRepositoryToken(Veiculo),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<VeiculoService>(VeiculoService)
    repository = module.get<Repository<Veiculo>>(getRepositoryToken(Veiculo))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
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
      jest.spyOn(repository, 'find').mockResolvedValue(result)

      expect(await service.findAll()).toEqual(result)
    })
  })

  describe('findOne', () => {
    it('should return a single veiculo by id', async () => {
      const result = {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        cor: 'Azul',
        placa: 'ABC1234',
        tipo: 'carro',
      }
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result)

      expect(await service.findOne(1)).toEqual(result)
    })

    it('should return null if no veiculo is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)

      expect(await service.findOne(99)).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a new veiculo', async () => {
      const createDto = {
        marca: 'Toyota',
        modelo: 'Corolla',
        cor: 'Azul',
        placa: 'DEF5678',
        tipo: 'carro',
      }
      const savedEntity = { id: 2, ...createDto }

      jest.spyOn(repository, 'create').mockReturnValue(createDto as Veiculo)
      jest.spyOn(repository, 'save').mockResolvedValue(savedEntity)

      expect(await service.create(createDto)).toEqual(savedEntity)
    })
  })

  describe('update', () => {
    it('should update an existing veiculo', async () => {
      const updateDto = { cor: 'Vermelho' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any)

      expect(await service.update(1, updateDto)).toEqual({ affected: 1 })
    })

    it('should return null if no veiculo is updated', async () => {
      const updateDto = { cor: 'Vermelho' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any)

      expect(await service.update(99, updateDto)).toEqual({ affected: 0 })
    })
  })

  describe('remove', () => {
    it('should remove a veiculo by id', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any)

      expect(await service.remove(1)).toEqual({ affected: 1 })
    })

    it('should return null if no veiculo is removed', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any)

      expect(await service.remove(99)).toEqual({ affected: 0 })
    })
  })
})
