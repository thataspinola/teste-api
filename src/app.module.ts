import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module'
import { VeiculoModule } from './veiculo/veiculo.module'
import { ControleModule } from './controle/controle.module'
import { AuthModule } from './auth/auth.module'
import { RelatorioModule } from './relatorio/relatorio.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'estacionamento',
      autoLoadEntities: true,
      synchronize: true, // Use somente em desenvolvimento
    }),
    EstabelecimentoModule,
    VeiculoModule,
    ControleModule,
    AuthModule,
    RelatorioModule,
  ],
  controllers: [],
})
export class AppModule {}
