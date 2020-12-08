import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/modules/users/entities/user.entity'
import { UsersService } from 'src/modules/users/services/users.service'
import { HashService } from 'src/shared/providers/hash/hash.service'
import { ValidUserDTO } from '../dtos/validUser.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser({ cpf, password }: ValidUserDTO): Promise<User> {
    const findUser = await this.usersService.findOneUser({
      column: 'cpf',
      value: cpf,
    })

    if (!findUser) {
      return null
    }

    const validPassword = await this.hashService.validateHash(
      password,
      findUser.password
    )

    console.log(validPassword)

    if (!validPassword) {
      return null
    }

    return findUser
  }

  public async createToken({
    cpf,
    id,
    name,
    email,
    role,
  }: User): Promise<{ token: string }> {
    const payload = { cpf, id, name, email, role }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
    }
  }

  public async login({
    cpf,
    password,
  }: ValidUserDTO): Promise<{
    token: string
    user: User
  }> {
    const user = await this.validateUser({ cpf, password })

    if (!user) {
      throw new UnauthorizedException('credentials incorrect')
    }

    const { token } = await this.createToken(user)

    return {
      token,
      user,
    }
  }
}
