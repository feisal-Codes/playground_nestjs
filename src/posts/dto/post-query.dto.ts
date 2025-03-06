import { IsEnum, IsString } from "class-validator";
import { postType } from "../enums/postType.enum";
export class PostQueriesDto{
    
    @IsEnum(postType)
    postType?:postType;
}