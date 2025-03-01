import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    ValidationPipe
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { GetUserParamsDTO } from './get-user-params.dto';
import { PatchUserDto } from './patch-user.dto';
import { UsersProvider } from './users';

@Controller('users')
export class UsersController {
    constructor(private readonly usersProvider: UsersProvider){

    }
    @Get('{:id}') // /users/id
    public findAll(
        @Param() getUserParams: GetUserParamsDTO, @Query('limit', new DefaultValuePipe(10))
        limit: number,
        @Query('page', new DefaultValuePipe(1)) page: number,
    ) {
       
        return this.usersProvider.findAll(getUserParams.id);
    }

    @Post('create-user') // users/create-user
    public create(@Body() createUserDTO: CreateUserDTO) {
       return this.usersProvider.create(createUserDTO);
    }

    @Post('/login')
    public login(@Body() userInfo:{email:string,password:string}){
         return this.usersProvider.login(userInfo.email, userInfo.password)
    }

    @Patch(':id') // /user/id
    public updateUser(@Body() patchUserDto: PatchUserDto, @Param()  getUserParams: GetUserParamsDTO){
        return this.usersProvider.update(getUserParams.id, patchUserDto);
    }

}
