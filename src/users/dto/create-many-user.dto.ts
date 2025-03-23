import { Type } from "class-transformer";
import { CreateUserDTO } from "./create-user.dto";
import { PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";

export class CreateManyUsersDto {
    @ValidateNested({
        each:true
    })
    @Type(()=>CreateUserDTO)
    @IsNotEmpty()
    @IsArray()
    users:CreateUserDTO[]

}