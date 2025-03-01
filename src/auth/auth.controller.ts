import { Controller,Post,Body } from '@nestjs/common';
import { Auth } from './auth';

@Controller('auth')
export class AuthController {

    //injected auth prrovider via the constructor
    constructor(private readonly auth:Auth){

    }

    @Post('/login')
    public login(@Body() userInfo:{email:string,password:string}){
       return this.auth.login(userInfo.email, userInfo.password)
         
    }


}
