import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import users from 'src/db/users';
import { Auth } from 'src/auth/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class UsersProvider {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @Inject(forwardRef(()=>Auth)) 
        private readonly auth:Auth,
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
    newUser = await this.usersRepository.save(newUser);
    return newUser;

  }

   public async findOne(id:number){
    return await this.usersRepository.findOneBy({id})
   }

    public findAll(id?: number) {
        return id ? users.find((user) => user.id == id) : users
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
