import { Module } from '@nestjs/common'
import { ControleController } from './controllers/controle.controller'
import { ControleService } from './services/controle.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Controle } from './entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Veiculo } from '@/veiculo/entities/veiculo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Controle, Estabelecimento, Veiculo])],
  controllers: [ControleController],
  providers: [ControleService],
})
export class ControleModule {}
