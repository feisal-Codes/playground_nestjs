import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { UserLoginDTO } from '../../auth/dto/user-login.dto';
@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    //for circular dependency we use forward ref with the inject decorator
    @Inject(forwardRef(()=>HashingProvider))
    private readonly hashingProvider: HashingProvider
  ) {}

  public async createUser(createUserDto: CreateUserDTO) {
    //check if user exists
    //if user doesnt exist throw an error
    let existingUser: any = undefined;

    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request', {
        description: 'error connecting to database',
      });
    }
    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password)
    let newUser = this.usersRepository.create({...createUserDto, password:hashedPassword});
     if(!newUser){
        throw new HttpException('failed to create user', 500)
     }
    
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      console.error(error)
      throw new RequestTimeoutException('Unable to save the user', {
        description: error,
      });
    }

    return newUser;
  }

  
}
