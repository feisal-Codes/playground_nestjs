import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './users';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider],
  exports:[UsersProvider],
  imports:[forwardRef(()=>AuthModule),TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
