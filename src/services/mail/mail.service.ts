import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Seja bem vindo ao Nice App! Confirme seu e-mail',
      template: './confirm.hbs',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
