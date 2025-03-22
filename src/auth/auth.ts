import { Injectable,Inject,forwardRef } from '@nestjs/common';
import { UsersProvider } from 'src/users/providers/users';

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
