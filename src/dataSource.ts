import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'HUNG',
  synchronize: false,
  ssl: false,
  logging: true,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['/src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
}

export const dataSource = new DataSource(dataSourceOption)

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
