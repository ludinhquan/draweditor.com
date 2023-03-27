import { JwtService } from "@nestjs/jwt"
import {TokenPayload} from "../interfaces";

type Options = {
  secret: string,
  expiresIn: string
}

export class Jwt {
  private static jwtService: JwtService = new JwtService();

  static sign(payload: TokenPayload, options: Options): string {
    return this.jwtService.sign(payload, options)
  }

  static verify(token: string, options: Options) {
    return this.jwtService.verify(token, options)
  }
} 
