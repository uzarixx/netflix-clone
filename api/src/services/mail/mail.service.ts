import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
  ) {
  }

  public authToken(
    text: string,
    to: string,
  ): void {
    this.mailerService
      .sendMail({
        to,
        from: 'Netflix clone <is3.andrei.2@gmail.com>',
        subject:
          'Registration netflix-clone',
        text: 'welcome to netflix-clone',
        html: `<b>your link - ${text}</b>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  public twoFactorAuthentication(
    text: string,
    to: string,
  ): void {
    this.mailerService
      .sendMail({
        to,
        from: 'Netflix clone <is3.andrei.2@gmail.com>',
        subject:
          'Two Factor Authentication - netflix-clone',
        text: 'Two Factor Authentication - netflix-clone',
        html: `<b>your code - ${text}</b>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
