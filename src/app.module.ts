import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {TypeOrmModule} from '@nestjs/typeorm';


@Module({
  imports: [UsersModule, AuthModule, PostsModule,
    TypeOrmModule.forRootAsync({

      useFactory:() =>({
        type:'postgres',
        entities:[],
        synchronize:true,
        port:5432,
        username:'postgres',
        password:'root',
        host:'localhost',
        database:'nest'
      })
      
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
