import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ValidUserDTO } from '../dtos/validUser.dto'
import { AuthService } from '../services/auth.service'
import { LoginReturn } from '../dtos/userReturn.dto'

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginReturn)
  public async login(
    @Args('args') { cpf, password }: ValidUserDTO
  ): Promise<LoginReturn> {
    const values = await this.authService.login({ cpf, password })
    return values
  }
}
