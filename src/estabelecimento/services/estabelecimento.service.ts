import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Estabelecimento } from '../entities/estabelecimento.entity'
import { CreateEstabelecimentoDto } from '../dtos/create-estabelecimento.dto'

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly repository: Repository<Estabelecimento>,
  ) {}

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  create(createEstabelecimentoDto: CreateEstabelecimentoDto) {
    const estabelecimento = this.repository.create(createEstabelecimentoDto)
    return this.repository.save(estabelecimento)
  }

  update(id: number, updateEstabelecimentoDto: CreateEstabelecimentoDto) {
    return this.repository.update(id, updateEstabelecimentoDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
