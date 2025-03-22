import { HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDTO } from '../create-user.dto';

@Injectable()
export class UsersCreateManyProvider {

    constructor(private readonly dataSource : DataSource){

    }


    public async createMany(createUserDTO: CreateUserDTO[]){
        //start transaction 
        const queryRunner = this.dataSource.createQueryRunner();
        let newUsers: User[] =[];

        //connect to db

        await queryRunner.connect()

        //start transaction

        await queryRunner.startTransaction()
        try {
            for(let user of createUserDTO){
               
                let newUser =  queryRunner.manager.create(User, user);
                await queryRunner.manager.save(newUser);
                newUsers.push(newUser);

            }

            await queryRunner.commitTransaction()
 


        }
        catch(error){
                await queryRunner.rollbackTransaction()
                throw new HttpException( 'failed to create users', 500)
        }
        finally{
           //release transaction
           queryRunner.release();
        }

    }
}
