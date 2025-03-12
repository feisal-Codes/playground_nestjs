import { Controller, Post,Body } from '@nestjs/common';
import { MetaOptionProvider } from './providers/meta-option';
import { CreatePostMetaOptionsDto } from './dto/create-metaoption.dto';
@Controller('meta-options')
export class MetaOptionsController {

 constructor(private readonly metaOption: MetaOptionProvider){

 }

    @Post('create')
    public create(@Body() createPostMetaOptionsDto:CreatePostMetaOptionsDto){
      let metaOption =  this.metaOption.create(createPostMetaOptionsDto) ;
      return metaOption;
    }
}
