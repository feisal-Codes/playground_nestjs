import { Controller, Post,Body } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    @Post('create')
    public create(@Body() createPostDto: CreatePostDTO){
      return createPostDto;
    }
}
