import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "../tag.entity";

@Injectable()
export class TagProvider {
constructor(@InjectRepository(Tag)
private tagRepository:Repository<Tag>

){

}
}