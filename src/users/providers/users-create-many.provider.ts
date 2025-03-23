import { HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateManyUsersDto } from '../dto/create-many-user.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(private readonly dataSource : DataSource){

    }


    public async createMany(createManyUserDto: CreateManyUsersDto){

        // console.log(createUserDTO)
        //start transaction 
        const queryRunner = this.dataSource.createQueryRunner();
        let newUsers: any = [];

        //connect to db

        await queryRunner.connect()

        //start transaction

        await queryRunner.startTransaction()
        try {
            for(let user of createManyUserDto.users){
               console.log(user);
                let newUser =  queryRunner.manager.create(User, user);
                let result =  await queryRunner.manager.save(newUser);
                newUsers.push(result);

            }

            await queryRunner.commitTransaction()
 


        }
        catch(error){
            console.log(error)
                await queryRunner.rollbackTransaction()
                throw new HttpException( 'failed to create users', 500)
        }
        finally{
           //release transaction
           queryRunner.release();
        }

        return newUsers;

    }
}
