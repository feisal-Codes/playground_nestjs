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

@Controller('users')
export class UsersController {
    @Get('{:id}') // /users/id
    public findAll(
        @Param() getUserParams: GetUserParamsDTO, @Query('limit', new DefaultValuePipe(10))
        limit: number,
        @Query('page', new DefaultValuePipe(1)) page: number,
    ) {
       
        return 'all users are here';
    }

    @Post('create-user') // users/create-user
    public create(@Body() createUserDTO: CreateUserDTO) {
        console.log(createUserDTO instanceof CreateUserDTO )
        return createUserDTO;
    }

    @Patch(':id') // /user/id
    public updateUser(@Body() patchUserDto: PatchUserDto, @Param()  getUserParams: GetUserParamsDTO){
        return patchUserDto;
    }
}
