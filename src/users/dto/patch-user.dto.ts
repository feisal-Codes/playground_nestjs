import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";
export class PatchUserDto extends PartialType(CreateUserDTO){
    
}