import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetUserParamsDTO{
    // @ApiPropertyOptional()

    // @IsOptional()
    @IsInt()
    @Type(()=>Number)
    id:number;
}