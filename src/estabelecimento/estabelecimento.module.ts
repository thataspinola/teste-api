import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Estabelecimento } from './entities/estabelecimento.entity'
import { EstabelecimentoController } from './controllers/estabelecimento.controller'
import { EstabelecimentoService } from './services/estabelecimento.service'

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento])],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  exports: [EstabelecimentoService], // Caso seja necessário usar em outro módulo
})
export class EstabelecimentoModule {}
