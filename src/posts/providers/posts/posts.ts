import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from 'src/posts/dto/create-post.dto';
import { postType } from 'src/posts/enums/postType.enum';

@Injectable()
export class Posts {
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) { }

    public async createPost(createPostDto: CreatePostDTO) {
        let newPost = this.postRepository.create(createPostDto);
        newPost = await this.postRepository.save(newPost);
        return newPost;
    }

    public async findAll(postType?: postType) {

        let allPost: CreatePostDTO[] = [];
        if (postType) {
            allPost = await this.postRepository.find({
                where:{
                    postType:postType
                }
            })
        }
        else {
            allPost = await this.postRepository.find();

        }
        return allPost;
    }


}
