
import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional, MaxLength } from "class-validator";
export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    secondName: string;
    @IsEmail()
    @MaxLength(100)
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