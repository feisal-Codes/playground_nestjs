import { BadRequestException, forwardRef, HttpException, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import users from 'src/db/users';
import { Auth } from 'src/auth/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dto/create-many-user.dto';

@Injectable()
export class UsersProvider {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @Inject(forwardRef(()=>Auth)) 
        private readonly auth:Auth,

        private readonly dataSource: DataSource,

        //inject CreateManyUser provider
        private readonly createManyUsersService : UsersCreateManyProvider
    ){

    }

 
  public async createUser(createUserDto:CreateUserDTO){
    //check if user exists 
    //if user doesnt exist throw an error
    let existingUser : any = undefined;

    try {
        existingUser = await this.usersRepository.findOne({
            where:{
                email:createUserDto.email
            }
        })
    
        
    } catch (error) {
        throw new RequestTimeoutException('Unable to process your request',{
            description:'error connecting to database'
        })
    
    }
    if (existingUser){
        throw new BadRequestException('User already exist')
    }
    

    let newUser = this.usersRepository.create(createUserDto);
    try {
        newUser = await this.usersRepository.save(newUser);

    } catch (error) {
        throw new RequestTimeoutException('Unable to save the user', {
            description:error
        })
    }
    
    return newUser;

  }


  public async createManyUser(createManyUserDto: CreateManyUsersDto){
    return await this.createManyUsersService.createMany(createManyUserDto)
  }
  public async findOne(id:number){
    console.log(id)
    let user:any=undefined
    try {
        user = await this.usersRepository.findOneBy({id})

        
    } catch (error) {
       new  RequestTimeoutException('could not connect to db')
    }
    if(!user){
         throw new HttpException('user not found', 404);
    }
    return user;
   }
   
 



         
    public findAll(id?: number) {
         
        try {
            return id ? users.find((user) => user.id == id) : users

            
        } catch (error) {
            throw new BadRequestException('user not found',{
                description:error
            })
        }

    }

    public create(user) {
        const id = users[users.length - 1].id + 1;
        const newUser = { ...user, id: id };
        users.push(newUser);
        return users;
    }

    public update(id:number | undefined, user:any){

        
        const updatedUsers = users.map((newUser)=>newUser.id == id ? {...newUser,...user}:newUser)
        console.log(updatedUsers)
        return updatedUsers;

    }
    public login(email:string, password:string){
        return this.auth.login(email,password)
    }
}
