import { Injectable, Request, Inject } from '@nestjs/common';
import { PaginationQueryDTO } from '../dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {

    constructor(
        /**  injecting the REQUEST   */
        @Inject(REQUEST)
        private readonly request: Request,

    ) {


    }

    public async paginateQuery<T extends ObjectLiteral>(
        paginationDto: PaginationQueryDTO ,
        repository: Repository<T>,
    ) {
        let results: T[] = [];

        try {
            results = await repository.find({
                skip: (paginationDto.page - 1) * paginationDto.limit,
                take: paginationDto.limit,
            });
        } catch (error) {
            console.error(error)
            throw new HttpException('An Error Occured', 404);
        }

     console.log(this.request)

     const totalItems = await repository.count();
     const totalPages = Math.ceil(totalItems/paginationDto.limit);
     const nextPage = paginationDto.page === totalPages ? paginationDto.page : paginationDto.page + 1;
     const previousPage = paginationDto.page === 1 ? paginationDto.page : paginationDto.page - 1;
     const finalResponse:Paginated<T> = {
         data:results,
         meta:{

            totalItems:totalItems,
            totalPages:totalPages,
            currentPage:paginationDto.page,
            itemsPerPage:paginationDto.limit,
            nextPage : nextPage,
            previousPage:previousPage
        }
     }
     return finalResponse;

    }

}
