import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileResolver } from 'src/shared/utils/fileFormatet.utils'
import { DeliveriesService } from '../services/deliveries.service'
import { Deliveries } from '../entities/deliveries.entity'
import { UploadImageDTO } from '../dtos/UploadImage.dto'

type ImageRequest = { filename: string }

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post('uploadSignature')
  @UseInterceptors(FileInterceptor('signatureImage', fileResolver))
  public async uploadSignatureId(
    @UploadedFile()
    image: ImageRequest,
    @Body() { deliveryId }: UploadImageDTO
  ): Promise<any> {
    console.log(image)

    const response = await this.deliveriesService.uploadSignatureImage(
      image.filename,
      deliveryId
    )

    return response
  }
}
