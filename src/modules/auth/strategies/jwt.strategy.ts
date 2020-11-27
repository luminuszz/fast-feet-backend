import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersService } from 'src/modules/users/services/users.service'
import { jwtConfig } from '../../../config/jwt'
import { PayloadDTO } from '../dtos/payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  public async validate(payload: PayloadDTO): Promise<PayloadDTO> {
    const user = await this.usersService.findOneUser({
      column: 'id',
      value: payload.id,
    })

    if (!user) {
      throw new UnauthorizedException('Not authorized')
    }
    const { cpf, email, id, role, name } = user

    return {
      cpf,
      email,
      id,
      name,
      role,
    }
  }
}
