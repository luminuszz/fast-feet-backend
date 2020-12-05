import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { AppService } from './app.service'
import { tmpFolder } from './shared/utils/fileFormatet.utils'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('files/images/signatures/:name')
  public getStaticFiles(
    @Param('name') fileName: string,
    @Res() res: Response
  ): void {
    const path = join(tmpFolder, fileName)

    return res.sendFile(path)
  }
}
