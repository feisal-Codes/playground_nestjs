import {
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
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
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { PaginationQueryDTO } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateCommentDTO } from 'src/comments/dto/create-comment.dto';
import { CommentsProvider } from 'src/comments/providers/comments.provider';

@Injectable()
export class Posts {
  constructor(
    private readonly userService: UsersProvider,
    private readonly tagsService: TagProvider,
    private readonly configService: ConfigService,
    private readonly pagination: PaginationProvider,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
    private readonly commentsProvider: CommentsProvider,
  ) {}

  public async createPost(createPostDto: CreatePostDTO, userId: number) {
    // const metaOption = createPostDto.metaOptions ? this.metaOptionRepository.create(createPostDto.metaOptions) : null;
    // await this.metaOptionRepository.save(metaOption);
    let author = await this.userService.findOne(userId);
    console.log(author);
    let { tags } = createPostDto;
    let tagIds: any = [];
    if (tags?.length && tags.length > 0) {
      tagIds = await this.tagsService.findTags(createPostDto?.tags);
    }

    let post = this.postRepository.create({ ...createPostDto, tags: tagIds });
    if (author) {
      post.author = author;
    }

    // if(metaOption) {
    //     post.metaOptions = metaOption;
    // }

    return await this.postRepository.save(post);
  }

  public async update(patchPostDTO: PatchPostDto) {
    let tags = await this.tagsService.findTags(patchPostDTO.tags);
    let post = await this.postRepository.findOneBy({
      id: patchPostDTO.id,
    });
    if (post) {
      post.title = patchPostDTO.title ?? post?.title;
      post.featuredImageUrl =
        patchPostDTO.featuredImageUrl ?? post.featuredImageUrl;
      post.content = patchPostDTO.content ?? post.content;
      post.postType = patchPostDTO.postType ?? post.postType;
      post.tags = tags ?? post.tags;
      return await this.postRepository.save(post);
    }
  }

  public async findAll(paginationDto: PaginationQueryDTO) {
    // const enviroment = this.configService.get('PORT');
    // console.log(enviroment);
    let allPosts: Paginated<Post> = {
      data: [],
      meta: {
        itemsPerPage: 0,
        currentPage: 0,
        nextPage: 0,
        previousPage: 0,
        totalItems: 0,
        totalPages: 0,
      },
    };

    try {
      allPosts = await this.pagination.paginateQuery(
        paginationDto,
        this.postRepository,
      );
    } catch (error) {
      throw new HttpException('could not connect', 404);
    }

    return allPosts;
  }

  public async findPostByUser(userId: number) {
    const posts = await this.postRepository.find({
      where: {
        id: userId,
      },
    });
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }

  public async addComment(
    postId: number,
    coment: CreateCommentDTO,
  ): Promise<Post> {
    //fetch the post
    //if it exists add the comment and save
    //else throw an error
    let post: Post | null;
    try {
      post = await this.postRepository.findOne({
        where: { id: postId },
        relations: ['comments'],
      });
      if (!post) {
        throw new HttpException('post doesnt exist', HttpStatus.BAD_REQUEST);
      }
      console.log(post);

      let comment = await this.commentsProvider.createComment(coment);

      console.log(coment);
      if (comment) {
        post.comments.push(comment);
        await this.postRepository.save(post);
      }
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Request timeout!');
    }

    return post;
  }
}
