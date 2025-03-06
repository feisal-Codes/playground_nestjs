import { Controller, Post, Body,Get, Query } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { Posts as PostService } from './providers/posts/posts';
import { postType } from './enums/postType.enum';
import { PostQueriesDto } from './dto/post-query.dto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postService: PostService) {}
  @Get()
  public findAllPost(@Query() postQueriesDto: PostQueriesDto ){
    const {postType} = postQueriesDto;
   
    return this.postService.findAll(postType);
  }
  @Post('create')
  public create(@Body() createPostDto: CreatePostDTO) {
    return this.postService.createPost(createPostDto);
  }
  
}
