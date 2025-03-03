import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Posts } from './providers/posts/posts';

@Module({
  controllers: [PostsController],
  providers: [Posts]
})
export class PostsModule {}
