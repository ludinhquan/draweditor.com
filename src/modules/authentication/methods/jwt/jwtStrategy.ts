import {IUser, IUserService} from '@/modules/users';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthenticationErrors, TokenPayload} from '../../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: IUserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication ?? request.headers.authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<IUser> {
    const user = await this.userService.getById(payload.userId);

    if (!user) throw new AuthenticationErrors.UserNotFound(`User with id ${payload.userId} does not exist`);

    return user
  }
}
