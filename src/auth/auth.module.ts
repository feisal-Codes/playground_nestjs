import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './providers/auth';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserLoginProvider } from './providers/user-login.provider';

@Module({
  controllers: [AuthController],
  providers: [Auth, { provide: HashingProvider, useClass: BcryptProvider }, UserLoginProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [Auth, HashingProvider,UserLoginProvider],
})
export class AuthModule {}
