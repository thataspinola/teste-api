import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('estabelecimentos')
export class Estabelecimento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  nome: string

  @Column({ unique: true })
  cnpj: string

  @Column()
  endereco: string

  @Column()
  telefone: string

  @Column('int')
  vagasMotos: number

  @Column('int')
  vagasCarros: number
}
