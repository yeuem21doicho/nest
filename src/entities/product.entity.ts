import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne , JoinColumn} from 'typeorm'
import { Common } from './common/common.entity'
import { User } from './user.entity'
import { Category } from './category.entity'
import { Brand } from './brand.entity'


@Entity()
export class Product extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length: 200 })
  name: string

  @ManyToOne(() => User, (user) => user.products)
  user: User

  @ManyToOne(() => Category, (category) => category.products)
  category: Category

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand
}
