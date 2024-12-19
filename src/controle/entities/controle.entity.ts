import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Estabelecimento } from '@/estabelecimento/entities/estabelecimento.entity'
import { Veiculo } from '@/veiculo/entities/veiculo.entity'

@Entity('controle')
export class Controle {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Estabelecimento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estabelecimento' })
  estabelecimento: Estabelecimento

  @ManyToOne(() => Veiculo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'veiculo' })
  veiculo: Veiculo

  @Column()
  estabelecimentoId: number

  @Column()
  veiculoId: number

  @Column()
  tipo: 'entrada' | 'saida'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date
}
