import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, ManyToOne } from 'typeorm'
import { Common } from './common/common.entity'
import { User } from './user.entity'
import { Product } from './product.entity'
import { Brand } from './brand.entity'

@Entity()
export class Category extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length: 200 })
  name: string

  @ManyToOne(() => User, (user) => user.categories)
  user: User

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]

  @ManyToMany(() => Brand, (brand) => brand.categories)
  brands: Brand[]
}
