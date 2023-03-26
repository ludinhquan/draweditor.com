import { JwtService } from "@nestjs/jwt"

type TokenPayload = {
  userId: string
}

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
