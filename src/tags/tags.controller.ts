import { Controller, Post,Body } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag-dto';
import { TagProvider } from './provider/tags.provider';

@Controller('tags')
export class TagsController {

    constructor(private readonly tagsService: TagProvider){

    }

@Post('create')
public post(@Body() createTagDto:CreateTagDto){

    return this.tagsService.create(createTagDto);
}

}
