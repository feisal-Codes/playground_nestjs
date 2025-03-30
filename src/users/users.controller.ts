import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    HttpCode,
    HttpStatus,
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
import { PaginationQueryDTO } from 'src/common/pagination/dto/pagination-query.dto';
import { get } from 'http';
import { UserLoginDTO } from '../auth/dto/user-login.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly usersProvider: UsersProvider){

    }
    // @Get('{:id}') // /users/id
    // public getUser(@Param('id') userId:number){
    //     console.log('here')
    //     return this.usersProvider.findOne(userId);

    // }
    @Get('{:id}') //users/id - id is optional
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
        @Param() getUserParams:GetUserParamsDTO,@Query() paginationQuery:PaginationQueryDTO
    ) {
       
        // return this.usersProvider.findAll(paginationQuery,getUserParams.id);
        return this.usersProvider.findOne(getUserParams.id)
    }



    @Post('create-user') // users/create-user
    public create(@Body() createUserDTO: CreateUserDTO) {
       return this.usersProvider.createUser(createUserDTO);
    }

    @Post('create-many') 
    public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto){
         return this.usersProvider.createManyUser(createManyUserDto);
    }
   
   

    @Patch(':id') // /user/id
    public updateUser(@Body() patchUserDto: PatchUserDto, @Param()  getUserParams: GetUserParamsDTO){
        return this.usersProvider.update(getUserParams.id, patchUserDto);
    }

}
