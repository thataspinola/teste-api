import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Veiculo } from '../entities/veiculo.entity'
import { CreateVeiculoDto } from '../dtos/create-veiculo.dto'

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly repository: Repository<Veiculo>,
  ) {}

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  create(createVeiculoDto: CreateVeiculoDto) {
    const veiculo = this.repository.create(createVeiculoDto)
    return this.repository.save(veiculo)
  }

  update(id: number, updateVeiculoDto: CreateVeiculoDto) {
    return this.repository.update(id, updateVeiculoDto)
  }

  remove(id: number) {
    return this.repository.delete(id)
  }
}
