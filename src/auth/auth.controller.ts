import { Controller,Post,Body,Get } from '@nestjs/common';
import { Auth } from './providers/auth';
import { HttpCode,HttpStatus } from '@nestjs/common';
import { UsersProvider } from 'src/users/providers/users';
import { UserLoginDTO } from 'src/auth/dto/user-login.dto';
import { GetUserParamsDTO } from 'src/users/dto/get-user-params.dto';
import { Param } from '@nestjs/common';
import { UserLoginProvider } from './providers/user-login.provider';

@Controller('auth')
export class AuthController {

    //injected auth prrovider via the constructor
    constructor(private readonly auth:Auth,
        private readonly userLogin:UserLoginProvider
    ){

    }

    @Post('/login/')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() userLoginDTO: UserLoginDTO){
        console.log('here')
         return await this.userLogin.login(userLoginDTO )
    }

    // @Get('{:id}')
    // public async  getUser(@Param() getUserParamsDto:GetUserParamsDTO){
    //       return await this.auth.findOne(getUserParamsDto);
    // }

    


}
