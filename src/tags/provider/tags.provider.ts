import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Tag } from "../tag.entity";
import { CreateTagDto } from "../dto/create-tag-dto";

@Injectable()
export class TagProvider {
constructor(@InjectRepository(Tag)
private tagRepository:Repository<Tag>

){}


public async create(tag:CreateTagDto){
    
    this.tagRepository.create(tag)
    return await this.tagRepository.save(tag)

        
}

public async findTags (tags:number[]|any){
let result = this.tagRepository.find({
    where:{
        id:In(tags)
    }
})

return result;


}
}