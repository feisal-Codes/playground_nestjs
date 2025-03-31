import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/authTypes';
import { AUTH_TYPE_KEY } from '../constants/auth.constant';

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, args);
