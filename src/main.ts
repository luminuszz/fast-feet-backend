import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as helmet from 'helmet'
import * as csurf from 'csurf'
import * as rateLimit from 'express-rate-limit'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(helmet())
  app.use(csurf())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  )
  await app.listen(3000)
}
bootstrap()
