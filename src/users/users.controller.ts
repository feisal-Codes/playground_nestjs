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
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserParamsDTO } from './dto/get-user-params.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersProvider } from './providers/users';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dto/create-many-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersProvider: UsersProvider){

    }
    @Get('{:id}') // /users/id
    public getUser(@Param('id') userId:number){
        console.log('here')
        return this.usersProvider.findOne(userId);

    }
    @ApiQuery({
        name:'limit',
        required:false,
        type:'number',
        example:10
    })
    @ApiQuery({
        name:'page',
        required:false,
        type:'number',
        example:1
    })
    public findAll(
        @Param() getUserParams: GetUserParamsDTO, @Query('limit', new DefaultValuePipe(10))
        limit: number,
        @Query('page', new DefaultValuePipe(1)) page: number,
    ) {
       
        // return this.usersProvider.findOne(getUserParams.id);
    }



    @Post('create-user') // users/create-user
    public create(@Body() createUserDTO: CreateUserDTO) {
       return this.usersProvider.createUser(createUserDTO);
    }

    @Post('create-many') 
    public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto){
         return this.usersProvider.createManyUser(createManyUserDto);
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
