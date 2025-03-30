import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDTO{

@IsEmail()
@IsNotEmpty()
email:string

@IsNotEmpty()
@IsString()

password:string

 
}