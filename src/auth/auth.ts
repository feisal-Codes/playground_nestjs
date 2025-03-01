import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { UsersProvider } from 'src/users/users';

@Injectable()
export class Auth {

 constructor(
    @Inject(forwardRef(()=>UsersProvider))
    private readonly userService:UsersProvider){

 }

 public login(email:string, password:string){

    return this.userService.findOne(1);
 }

 

}
