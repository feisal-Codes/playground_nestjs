import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateCommentDTO {
    
    @MaxLength(250)
    @MinLength(1)
    @IsNotEmpty()
    body:string
}