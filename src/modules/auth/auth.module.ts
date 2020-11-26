import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthService } from './services/auth.service'
import { HashModuleProvider } from '../../shared/providers/hash/hash.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../../config/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthResolver } from './resolvers/auth.resolver'

@Module({
  imports: [
    UsersModule,
    HashModuleProvider,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expireIn },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
