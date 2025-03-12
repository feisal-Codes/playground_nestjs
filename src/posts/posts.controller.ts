import { Controller, Post, Body,Get, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { Posts as PostService } from './providers/posts/posts';
import { postType } from './enums/postType.enum';
import { PostQueriesDto } from './dto/post-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { MetaOptionProvider } from 'src/meta-options/providers/meta-option';

@Controller('posts')
export class PostsController {

  constructor(private readonly postService: PostService,
   

  ) {}
  @Get()
  public findAllPost(@Query() postQueriesDto: PostQueriesDto ){
    const {postType} = postQueriesDto;
   
    return this.postService.findAll(postType);
  }
  @Post('create')
  public async create(@Body() createPostDto: CreatePostDTO) {
   return this.postService.createPost(createPostDto);
  }

  @Delete('delete')
  public delete(@Query('id', ParseIntPipe) id:number){
    return this.postService.delete(id)

  }

  
  
}
