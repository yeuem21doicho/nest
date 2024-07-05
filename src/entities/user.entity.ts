import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import { Common } from './common/common.entity'

import { Category } from './category.entity'
import { Product } from './product.entity'

@Entity()
export class User extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length: 32 })
  name: string

  @Column({ unique: true, nullable: false, length: 20 })
  userName: string

  @Column({ type: 'simple-array', nullable: false })
  roles: string[]

  @Column({ nullable: false })
  password: string

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[]

  @OneToMany(() => Product, (product) => product.user)
  products: Product[]
}
