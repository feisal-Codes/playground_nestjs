import { ModuleRef } from '@nestjs/core';
import {
    BadRequestException,
    forwardRef,
    HttpException,
    Inject,
    Injectable,
    RequestTimeoutException,
    UnauthorizedException,
    HttpStatus,
} from '@nestjs/common';
import { UserLoginDTO } from '../dto/user-login.dto';
import { UsersProvider } from 'src/users/providers/users';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class UserLoginProvider {
  // private userService: UsersProvider;

  constructor(
      private readonly hashingProvider: HashingProvider,
      // private readonly moduleRef: ModuleRef,
      @Inject(forwardRef(()=>UsersProvider))
      private readonly userService:UsersProvider,
      private readonly jwtService:JwtService,
      @Inject(jwtConfig.KEY)
      private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
      
  ) {}

  // onModuleInit is called once the module is fully initialized.
  // async onModuleInit() {
  //     // Pass undefined as contextId, then options as third parameter
  //     this.userService = await this.moduleRef.resolve(UsersProvider, undefined, { strict: false });
  // }

  public async login(loginDetails: UserLoginDTO) {
      let isAuthenticated: boolean = false;
      try {
       
        const user = await this.userService.findUserByEmail(loginDetails.email);

        if (!user) {
            throw new HttpException('User Not Found', 404);
        }

        isAuthenticated = await this.hashingProvider.comparePassword(
            loginDetails.password,
            user.password
        );

        if (!isAuthenticated) {
            throw new UnauthorizedException('Wrong Email/Password');
        }

        const accessToken = await this.jwtService.signAsync({
          sub:user.id,
          email:user.email
        },
        {
          audience:this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret : this.jwtConfiguration.secret,
          expiresIn:this.jwtConfiguration.expiry
        }
      
      
      )

        return {
           accessToken
        };

      } catch (e) {
          const status = e instanceof HttpException ? e.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
          throw new HttpException(e.message, status);
      }
  }
}
