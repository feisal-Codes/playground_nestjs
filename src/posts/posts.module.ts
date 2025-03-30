import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Posts } from './providers/posts/posts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [PostsController],
  providers: [Posts],
  imports:[TypeOrmModule.forFeature([Post,MetaOption]), UsersModule, TagsModule,PaginationModule,CommentsModule]
})
export class PostsModule {



  
}
