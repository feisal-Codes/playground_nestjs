import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './providers/users';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider, UsersCreateManyProvider],
  exports:[UsersProvider],
  imports:[forwardRef(()=>AuthModule),TypeOrmModule.forFeature([User])]
})
export class UsersModule {





}
