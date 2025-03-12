import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from 'src/posts/dto/create-post.dto';
import { postType } from 'src/posts/enums/postType.enum';
import { User } from 'src/users/user.entity';
import { UsersProvider } from 'src/users/users';
import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class Posts {
    constructor(
        private readonly userService : UsersProvider,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(MetaOption) private metaOptionRepository: Repository<MetaOption>
    ) { }

    public async createPost(createPostDto: CreatePostDTO ) {

        // const metaOption = createPostDto.metaOptions ? this.metaOptionRepository.create(createPostDto.metaOptions) : null;
        // await this.metaOptionRepository.save(metaOption);
        let post = this.postRepository.create(createPostDto)
        // if(metaOption) {
        //     post.metaOptions = metaOption;
        // }

        return await this.postRepository.save(post)
        
       
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
