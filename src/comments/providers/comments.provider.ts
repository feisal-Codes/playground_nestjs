import { HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comments.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { CreateCommentDTO } from '../dto/create-comment.dto';

@Injectable()
export class CommentsProvider {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
    ){}



   public async createComment(coment: CreateCommentDTO):Promise<Comment>{

     
     let comment : Comment;
     let addedComment :Comment;
    try {
        comment = this.commentsRepository.create(coment);
         addedComment = await this.commentsRepository.save(comment)
        console.log(addedComment)
        
    } catch (error) {
        throw new RequestTimeoutException('Request Timeout!')
    }
      
      return addedComment;

   }


}
