export const SmsService = Symbol('SmsService')

export interface ISmsService {
  sendSms(phoneNumber: string, message: string): Promise<void>
}
