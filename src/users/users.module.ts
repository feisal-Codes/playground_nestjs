import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './providers/users';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider, UsersCreateManyProvider, CreateUserProvider],
  exports:[UsersProvider],
  imports:[forwardRef(()=>AuthModule),TypeOrmModule.forFeature([User]),PaginationModule]
})
export class UsersModule {





}
