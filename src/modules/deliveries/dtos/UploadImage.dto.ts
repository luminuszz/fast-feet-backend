import { IsNotEmpty, IsUUID } from 'class-validator'

export class UploadImageDTO {
  @IsNotEmpty()
  @IsUUID()
  deliveryId: string
}
