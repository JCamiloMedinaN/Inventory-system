export interface IEmailService {
  /**
   * Envía un correo genérico.
   * Permite que cualquier parte de la App use el servicio.
   */
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}
