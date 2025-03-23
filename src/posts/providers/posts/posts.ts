import { HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from 'src/posts/dto/create-post.dto';
import { postType } from 'src/posts/enums/postType.enum';
import { User } from 'src/users/user.entity';
import { UsersProvider } from 'src/users/providers/users';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { TagProvider } from 'src/tags/provider/tags.provider';
import { PatchPostDto } from 'src/posts/dto/patch-post.dto';
import { config, title } from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Posts {
    constructor(
        private readonly userService : UsersProvider,
        private readonly tagsService : TagProvider,
        private readonly configService: ConfigService,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(MetaOption) private metaOptionRepository: Repository<MetaOption>
    ) { }

    public async createPost(createPostDto: CreatePostDTO ) {

        // const metaOption = createPostDto.metaOptions ? this.metaOptionRepository.create(createPostDto.metaOptions) : null;
        // await this.metaOptionRepository.save(metaOption);
        let author = await this.userService.findOne(createPostDto.authorId)
        let {tags}= createPostDto;
        let tagIds:any = [];
        if(tags?.length && tags.length > 0) {
            tagIds = await this.tagsService.findTags(createPostDto?.tags)

        }

        let post = this.postRepository.create({...createPostDto, tags:tagIds});
        if(author) {
            post.author = author

        }
        
        // if(metaOption) {
        //     post.metaOptions = metaOption;
        // }

        return await this.postRepository.save(post)
        
       
    }


    public async  update(patchPostDTO:PatchPostDto){

        let tags = await this.tagsService.findTags(patchPostDTO.tags)
        let post = await this.postRepository.findOneBy({
            id:patchPostDTO.id  })
        if(post){
            post.title = patchPostDTO.title ??post?.title;
            post.featuredImageUrl = patchPostDTO.featuredImageUrl ?? post.featuredImageUrl;
            post.content = patchPostDTO.content ?? post.content;
            post.postType = patchPostDTO.postType ?? post.postType;
            post.tags = tags ?? post.tags;
            return await this.postRepository.save(post);
        }
    }

    public async findAll(userId : number) {
        // const enviroment = this.configService.get('PORT');
        // console.log(enviroment);
        let allPosts:Post[] =[] 

        try{

        let author = await this.userService.findOne(userId);
        if(author) {
            allPosts = await this.postRepository.find({
                where:{
                  author
                },
                relations:{
                    tags:true,
                    author: true
                }
            })
        }
        

        
             
        }
        catch(error){
            throw new HttpException('user not found', 404)
        }


        return allPosts;
    }

    public async findPostByUser(userId:number) {
        const posts = await this.postRepository.find({
            where:{
                id:userId
            }
        })
    }


    public async delete (id:number) {
 
    await this.postRepository.delete(id)

    return {deleted:true, id}

    }


}
