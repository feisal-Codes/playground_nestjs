import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from './access-token/access-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/authTypes';
import { AUTH_TYPE_KEY } from '../constants/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static defaultAuthType = AuthType.Bearer;
  private authTypeGuardsMap: Record<AuthType, CanActivate | CanActivate[]>;

  constructor(
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly reflector: Reflector,
  ) {
    this.authTypeGuardsMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //get metadata from controller
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];
    
    console.log(authTypes)
    //array of guards
    // loop guards and fire canactivate

    return true;
  }
}
