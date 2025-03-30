import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersProvider } from 'src/users/providers/users';
import { UserLoginProvider } from './user-login.provider';
// import { UserLoginDTO } from '../dto/user-login.dto';
import { GetUserParamsDTO } from 'src/users/dto/get-user-params.dto';

@Injectable()
export class Auth {
  constructor(
   //  private userLogin: UserLoginProvider,
    
  ) {}

//   public async login(userLoginDTO: UserLoginDTO) {
//     return await this.userLogin.login(userLoginDTO);
//   }

//   public async findOne(getUserParamsDto: GetUserParamsDTO) {
//     return;
//     {
//     }
//   }
}
