import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  marca: string

  @Column({ length: 50 })
  modelo: string

  @Column({ length: 30 })
  cor: string

  @Column({ unique: true })
  placa: string

  @Column()
  tipo: string // carro ou moto
}
