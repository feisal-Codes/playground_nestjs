import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tag.entity';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [UsersModule, AuthModule, PostsModule, TagsModule, ConfigModule.forRoot({
    isGlobal:true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject:[ConfigService],
     useFactory:(configService: ConfigService) =>({
        
        type:'postgres',
        // entities:[User,Post,Tag],
        autoLoadEntities:true,
        synchronize:true,
        port:configService.get('DB_PORT'),
        username:configService.get('DB_USERNAME'),
        password:configService.get('DB_PASSWORD'),
        host:configService.get('DB_HOST'),
        database:configService.get('DB_DATABASE')
      })
      
    }), MetaOptionsModule, PaginationModule, CommentsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
