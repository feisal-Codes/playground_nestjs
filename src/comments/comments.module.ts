import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsProvider } from './providers/comments.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';

@Module({
  controllers: [CommentsController],
  providers:[CommentsProvider],
  imports:[TypeOrmModule.forFeature([Comment]), PaginationModule],
  exports:[CommentsProvider]
})
export class CommentsModule {}
