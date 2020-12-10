import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { mailConstants } from 'src/config/mail'
import { IEmailProvider } from '../dtos/IEmailProvider'
import { SendEmailDTO } from '../dtos/sendEmail.dto'

@Injectable()
export class EtherialEmailProvider implements IEmailProvider {
  public async sendEmail({ body, to }: SendEmailDTO): Promise<void> {
    const data = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: data.smtp.host,
      port: data.smtp.port,
      secure: data.smtp.secure,
      auth: {
        user: data.user,
        pass: data.pass,
      },
    })

    const info = await transporter.sendMail({
      ...mailConstants,
      to,
      text: body,
      html: 'teste',
    })

    console.log('teste', nodemailer.getTestMessageUrl(info))
  }
}
