import {IUser} from '@/modules/users';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthenticationService} from '../../authenticationService';
import {AuthenticationErrors} from '../../interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<IUser> {
    const result = await this.authenticationService.getAuthenticatedUser(email, password);

    if (result.isFailure) throw new AuthenticationErrors.WrongCredentialProvided(result.getError());

    return result.getValue()
  }
}
