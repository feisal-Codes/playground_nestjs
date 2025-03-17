import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { 
    IsArray, 
    IsDate, 
    IsEnum, 
    IsInt, 
    IsISO8601, 
    IsJSON, 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString, 
    IsUrl, 
    ValidateNested 
} from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { Type } from "class-transformer";
import { CreatePostMetaOptionsDto } from "src/meta-options/dto/create-metaoption.dto";

export class CreatePostDTO {

    @ApiProperty({ example: "NestJS Validation Example", description: "The title of the post" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: postType.STORY, enum: postType, description: "Type of the post" })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({ example: "nestjs-validation-example", description: "SEO-friendly slug for the post" })
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiProperty({ example: postStatus.PUBLISHED, enum: postStatus, description: "Status of the post" })
    @IsNotEmpty()
    @IsEnum(postStatus)
    status: postStatus;

    @ApiPropertyOptional({ example: "This is a sample blog post content", description: "Content of the post" })
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({ 
        example: '{"type":"article","author":"John Doe"}', 
        description: "Schema metadata in JSON format" 
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({ 
        example: "https://example.com/image.jpg", 
        description: "URL of the featured image" 
    })
    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @ApiProperty({ 
        example: "2025-03-10T10:00:00.000Z", 
        description: "Scheduled publishing date (ISO8601 format)" 
    })
    @IsISO8601()
    publishOn: Date;

    @ApiPropertyOptional({ 
        example: ["1", "2", "3"], 
        description: "Tags related to the post" 
    })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    tags?: number[];

    @ApiPropertyOptional({ 
        type: [CreatePostMetaOptionsDto], 
        description: "Additional metadata options for the post" 
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto  ;


    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    authorId: number;
}
