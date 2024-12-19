import { Test, TestingModule } from '@nestjs/testing'
import { EstabelecimentoService } from '../services/estabelecimento.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Estabelecimento } from '../entities/estabelecimento.entity'
import { Repository } from 'typeorm'

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('EstabelecimentosService', () => {
  let service: EstabelecimentoService
  let repository: Repository<Estabelecimento>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstabelecimentoService,
        {
          provide: getRepositoryToken(Estabelecimento),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<EstabelecimentoService>(EstabelecimentoService)
    repository = module.get<Repository<Estabelecimento>>(
      getRepositoryToken(Estabelecimento),
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return an array of estabelecimentos', async () => {
      const result = [
        {
          id: 1,
          nome: 'Estabelecimento 1',
          cnpj: '123',
          endereco: 'Endereço 1',
          telefone: '12345678',
          vagasMotos: 10,
          vagasCarros: 20,
        },
      ]
      jest.spyOn(repository, 'find').mockResolvedValue(result)

      expect(await service.findAll()).toEqual(result)
    })
  })

  describe('findOne', () => {
    it('should return a single estabelecimento by id', async () => {
      const result = {
        id: 1,
        nome: 'Estabelecimento 1',
        cnpj: '123',
        endereco: 'Endereço 1',
        telefone: '12345678',
        vagasMotos: 10,
        vagasCarros: 20,
      }
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(result)

      expect(await service.findOne(1)).toEqual(result)
    })

    it('should return null if no estabelecimento is found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)

      expect(await service.findOne(99)).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a new estabelecimento', async () => {
      const createDto = {
        nome: 'Novo Estabelecimento',
        cnpj: '456',
        endereco: 'Novo Endereço',
        telefone: '87654321',
        vagasMotos: 5,
        vagasCarros: 15,
      }
      const savedEntity = { id: 2, ...createDto }

      jest
        .spyOn(repository, 'create')
        .mockReturnValue(createDto as Estabelecimento)
      jest.spyOn(repository, 'save').mockResolvedValue(savedEntity)

      expect(await service.create(createDto)).toEqual(savedEntity)
    })
  })

  describe('update', () => {
    it('should update an existing estabelecimento', async () => {
      const updateDto = { nome: 'Estabelecimento Atualizado' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any)

      expect(await service.update(1, updateDto)).toEqual({ affected: 1 })
    })

    it('should return null if no estabelecimento is updated', async () => {
      const updateDto = { nome: 'Estabelecimento Atualizado' }
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any)

      expect(await service.update(99, updateDto)).toEqual({ affected: 0 })
    })
  })

  describe('remove', () => {
    it('should remove an estabelecimento by id', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any)

      expect(await service.remove(1)).toEqual({ affected: 1 })
    })

    it('should return null if no estabelecimento is removed', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any)

      expect(await service.remove(99)).toEqual({ affected: 0 })
    })
  })
})
