import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import users from 'src/db/users';
import { Auth } from 'src/auth/providers/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dto/create-many-user.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { PaginationQueryDTO } from 'src/common/pagination/dto/pagination-query.dto';
import { CreateUserProvider } from './create-user.provider';
import { UserLoginDTO } from '../../auth/dto/user-login.dto';
import { UserLoginProvider } from 'src/auth/providers/user-login.provider';
@Injectable()
export class UsersProvider {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => Auth))
    private readonly auth: Auth,

    private readonly dataSource: DataSource,

    //inject CreateManyUser provider
    private readonly createManyUsersService: UsersCreateManyProvider,
    //inject pagination here
    private readonly paginated: PaginationProvider,

    private readonly createUserProvider: CreateUserProvider,
  
  ) {}

  public async createUser(createUserDto: CreateUserDTO) {
    return this.createUserProvider.createUser(createUserDto);
  }

  public async createManyUser(createManyUserDto: CreateManyUsersDto) {
    return await this.createManyUsersService.createMany(createManyUserDto);
  }


  public async findUserByEmail(email: string) {
   
   console.log(email)
    let user: any = undefined;
    try {
       const users = await this.usersRepository.find()
       console.log(users)
       console.log('not executed');
        user = await this.usersRepository.findOneBy({ email:email });
     
        
    } catch (error) {
      console.error(error)
     throw new RequestTimeoutException('could not connect to db');
    }
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    return user;
  }



  public async findOne(id: number ) {
   
 
    let user: any = undefined;
    try {
     
     
        user = await this.usersRepository.findOneBy({ id:id });

        
    } catch (error) {
      new RequestTimeoutException('could not connect to db');
    }
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    return user;
  }

  
  public findAll(paginationDTO: PaginationQueryDTO, id?: number) {
    try {
      if (id) {
        return users.find((user) => user.id == id);
      } else {
        return this.paginated.paginateQuery(
          paginationDTO,
          this.usersRepository,
        );
      }
    } catch (error) {
      throw new BadRequestException('user not found', {
        description: error,
      });
    }
  }

  public create(user) {
    const id = users[users.length - 1].id + 1;
    const newUser = { ...user, id: id };
    users.push(newUser);
    return users;
  }

  public update(id: number | undefined, user: any) {
    const updatedUsers = users.map((newUser) =>
      newUser.id == id ? { ...newUser, ...user } : newUser,
    );
    console.log(updatedUsers);
    return updatedUsers;
  }
  // public login(userLoginDTO:UserLoginDTO) {
  //   return this.userLogin.login(userLoginDTO)
  // }
}
