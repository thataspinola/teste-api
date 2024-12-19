import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RelatorioController } from './controllers/relatorio.controller'
import { RelatorioService } from './services/relatorio.service'
import { Controle } from '../controle/entities/controle.entity'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Veiculo } from '@/veiculo/entities/veiculo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento, Controle, Veiculo])],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}
