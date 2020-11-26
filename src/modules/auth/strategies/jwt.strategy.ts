import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { jwtConfig } from '../../../config/jwt'
import { PayloadDTO } from '../dtos/payload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  public validate({ cpf, email, id, name, role }: PayloadDTO): PayloadDTO {
    return {
      cpf,
      email,
      id,
      name,
      role,
    }
  }
}
