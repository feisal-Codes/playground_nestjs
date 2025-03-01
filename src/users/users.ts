import { forwardRef, Inject, Injectable } from '@nestjs/common';
import users from 'src/db/users';
import { Auth } from 'src/auth/auth';

@Injectable()
export class UsersProvider {

    constructor(
        @Inject(forwardRef(()=>Auth))
        private readonly auth:Auth
    ){

    }

 

   public findOne(id:number){
    return id ? users.find((user) => user.id == id):'not found';
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
