import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "../meta-options.entity";
import { Repository } from "typeorm";


@Injectable(
)
export class MetaOptionProvider{
    constructor(    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>
){

    
}
}