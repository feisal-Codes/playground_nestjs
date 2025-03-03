import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMetaOptionsDTO {

    @ApiProperty({ example: "author", description: "Meta key for the post" })
    @IsString()
    @IsNotEmpty()
    key: string;

    @ApiProperty({ example: "John Doe", description: "Meta value associated with the key" })
    @IsNotEmpty()
    value: any;
}
