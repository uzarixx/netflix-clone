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
        html: `<b>your activation code - ${text}</b>`,
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

  public twoFactorDisabled(
    text: string,
    to: string,
  ): void {
    this.mailerService
      .sendMail({
        to,
        from: 'Netflix clone <is3.andrei.2@gmail.com>',
        subject:
          'Two Factor Authentication Disabled',
        text: 'Two Factor Authentication Disabled',
        html: `
              <b>Disable code - ${text}</b>
              <br/>
              <b>You can enter this code to this <a href='http://localhost:3000/disabled-two-factor'>link</a></b>
              `,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public forgotToken(
    text: string,
    to: string,
  ): void {
    this.mailerService
      .sendMail({
        to,
        from: 'Netflix clone <is3.andrei.2@gmail.com>',
        subject:
          'Reset your password',
        text: 'Reset your password - netflix-clone',
        html: `<b>Reset link - ${text}</b>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
