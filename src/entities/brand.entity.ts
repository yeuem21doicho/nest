import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { Common } from './common/common.entity'
import { Category } from './category.entity'
import { Product } from './product.entity'

@Entity()
export class Brand extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length: 200 })
  name: string

  @ManyToMany(() => Category, (category) => category.brands)
  @JoinTable()
  categories: Category[]

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
