import nodemailer, { Transporter } from 'nodemailer';

import { IEmailService } from '../../../modules/users/domain/services/IEmailService.js';

export class NodemailerEmailService implements IEmailService {
  private transporter: Transporter;

  constructor(transporter?: Transporter) {
    this.transporter =
      transporter ||
      nodemailer.createTransport({
        host: process.env['SMTP_HOST'],
        port: Number(process.env['SMTP_PORT']),
        secure: process.env['SMTP_SECURE'] === 'true',
        auth: {
          user: process.env['SMTP_USER'],
          pass: process.env['SMTP_PASS'],
        },
      });
  }

  // Implementamos el método genérico
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"EcoTech Assets" <${process.env['SMTP_USER']}>`,
        to,
        subject,
        html: body,
      });
    } catch (error) {
      console.error('Email error details:', error);
      throw new Error('Could not send email', { cause: error });
    }
  }
}
