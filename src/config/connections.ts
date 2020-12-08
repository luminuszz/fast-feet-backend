import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const pgConnection: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'fasfeet',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}

export const mongoConnection: TypeOrmModuleOptions = {
  name: 'mongo',
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  useUnifiedTopology: true,
  database: 'fastfeet',
  entities: ['dist/**/schemas/*.schema.js'],
}

export enum connection {
  pg = 'default',
  mongo = 'mongo',
}
