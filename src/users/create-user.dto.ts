
import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional, MaxLength, isNotEmpty } from "class-validator";
export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    secondName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(16, {
        message: 'max length should be atleast 16 character'
    })
    @MinLength(6, {
        message: 'minimum length shoul be atleasr 6 character'
    })
    @IsNotEmpty()
    password: string
}