import { User, UserRole } from 'src/modules/users/entities/user.entity'
import { uuid } from 'uuidv4'

interface timeStamp {
  createdAt: Date
  updatedAt: Date
}

export class TestUtil {
  private static createTimeStamp(): timeStamp {
    const data: timeStamp = {
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    return data
  }

  public static giveValidUser(): User {
    const validUser = new User()

    const { updatedAt, createdAt } = this.createTimeStamp()

    validUser.id = uuid()
    validUser.cpf = '2136545646'
    validUser.createdAt = createdAt
    validUser.updatedAt = updatedAt
    validUser.name = 'Carlos da silva'
    validUser.email = 'carlos da silva@gmail.com'
    validUser.password = '123456'
    validUser.role = UserRole.User

    return validUser
  }
}
