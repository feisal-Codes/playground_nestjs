import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Posts } from './providers/posts/posts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';

@Module({
  controllers: [PostsController],
  providers: [Posts],
  imports:[TypeOrmModule.forFeature([Post])]
})
export class PostsModule {



  
}
