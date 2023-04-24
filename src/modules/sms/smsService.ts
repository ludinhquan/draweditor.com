import {ISmsService} from "./ISmsService";
import * as twilio from "twilio";
import {configs} from "@/config";

export class TwilioSmsService implements ISmsService {
  private readonly client: twilio.Twilio

  constructor() {
    this.client = twilio(configs.TWILIO_ACCOUNT_SID, configs.TWILIO_AUTH_TOKEN)
  }

  async sendSms(phoneNumber: string, message: string) {
    const result = await this.client.messages.create({
      from: '+16813666737',
      to: phoneNumber,
      body: message,
    });

    console.log(result);
  }
}
