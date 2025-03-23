import { Controller, Post, Body,Get, Query, Delete, ParseIntPipe, Patch, Param } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { Posts as PostService } from './providers/posts/posts';
import { postType } from './enums/postType.enum';
import { PostQueriesDto } from './dto/post-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { Repository } from 'typeorm';
import { MetaOptionProvider } from 'src/meta-options/providers/meta-option';
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';

import { PaginationQueryDTO } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postService: PostService,
   

  ) {}
  @Get('{:userId}')
  public findAllPost(@Param('userId') userId: number, @Query() getPostDto: GetPostsDto){
    // const {postType} = postQueriesDto;
  //  console.log(getPostDto);
    return this.postService.findAll(userId);
  }

  
  @Post('create')
  public async create(@Body() createPostDto: CreatePostDTO) {
   return this.postService.createPost(createPostDto);
  }

  @Patch('update')
  public async update(@Body() patchPostDto: PatchPostDto){
          return this.postService.update(patchPostDto)
  }

  @Delete('delete')
  public delete(@Query('id', ParseIntPipe) id:number){
    return this.postService.delete(id)

  }

  
  
}
