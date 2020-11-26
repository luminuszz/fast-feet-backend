import { UserRole } from 'src/modules/users/entities/user.entity'

export interface PayloadDTO {
  cpf: string
  id: string
  name: string
  email: string
  role: UserRole
}
