import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "../meta-options.entity";
import { Repository } from "typeorm";
import { CreatePostMetaOptionsDto } from "../dto/create-metaoption.dto";

@Injectable(
)
export class MetaOptionProvider{
    constructor( @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>
){}

public async create(metaOption){
       let metaOptions =  this.metaOptionRepository.create(metaOption);
       metaOption = await this.metaOptionRepository.save(metaOption)
       return metaOption;
}
}