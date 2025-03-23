import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDTO } from "src/common/pagination/dto/pagination-query.dto";

 export class GetPostsDto extends PaginationQueryDTO {
    @IsOptional()
    @IsDate()
    startDate?:Date;

    @IsOptional()
    @IsDate()

    endDate?:Date;
}


