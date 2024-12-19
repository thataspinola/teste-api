import { Test, TestingModule } from '@nestjs/testing'
import { ControleService } from './controle.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Controle } from '../entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Veiculo } from '@/veiculo/entities/veiculo.entity'

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('ControleService', () => {
  let service: ControleService
  let repository: Repository<Controle>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ControleService,
        {
          provide: getRepositoryToken(Controle),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Estabelecimento),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Veiculo),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<ControleService>(ControleService)
    repository = module.get<Repository<Controle>>(getRepositoryToken(Controle))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getEntriesAndExits', () => {
    it('should return a list of entries and exits for an establishment', async () => {
      const result = [
        {
          id: 1,
          estabelecimentoId: 1,
          veiculoId: 1,
          tipo: 'entrada',
          timestamp: new Date(),
        },
      ]
      jest.spyOn(repository, 'find').mockResolvedValue(result)

      expect(await service.getEntriesAndExits(1)).toEqual(result)
    })
  })

  describe('findOne', () => {
    it('should return a single control record by ID', async () => {
      const result = {
        id: 1,
        estabelecimentoId: 1,
        veiculoId: 1,
        tipo: 'entrada',
        timestamp: new Date(),
      }
      jest.spyOn(repository, 'findOne').mockResolvedValue(result)

      expect(await service.findOne(1)).toEqual(result)
    })

    it('should return null if no control record is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)

      expect(await service.findOne(99)).toBeNull()
    })
  })

  describe('registerEntryOrExit', () => {
    it('should register a new entry or exit', async () => {
      const createDto = { estabelecimentoId: 1, veiculoId: 1, tipo: 'entrada' }
      const result = { id: 1, ...createDto, timestamp: new Date() }

      jest.spyOn(repository, 'create').mockReturnValue(createDto as Controle)
      jest.spyOn(repository, 'save').mockResolvedValue(result)

      expect(await service.registerEntryOrExit(createDto)).toEqual(result)
    })

    it('should throw an error if establishment or vehicle is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null)

      await expect(
        service.registerEntryOrExit({
          estabelecimentoId: 99,
          veiculoId: 99,
          tipo: 'entrada',
        }),
      ).rejects.toThrow()
    })
  })

  describe('update', () => {
    it('should update a control record', async () => {
      const updateDto = { tipo: 'saida' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any)

      expect(await service.update(1, updateDto)).toEqual({
        id: 1,
        ...updateDto,
      })
    })

    it('should return null if no record is updated', async () => {
      const updateDto = { tipo: 'saida' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any)

      expect(await service.update(99, updateDto)).toBeNull()
    })
  })
})
