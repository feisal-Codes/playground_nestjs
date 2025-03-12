import { IsEnum, IsOptional, IsString } from "class-validator";
import { postType } from "../enums/postType.enum";
export class PostQueriesDto{
    
    @IsEnum(postType)
    @IsOptional()
    postType?:postType | undefined;
}