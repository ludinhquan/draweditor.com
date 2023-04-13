export const EmailService = Symbol('EmailService');

export interface IEmailService {
  sendMail(): Promise<boolean>
}
