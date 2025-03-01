import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './users';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider],
  exports:[UsersProvider],
  imports:[forwardRef(()=>AuthModule)]
})
export class UsersModule {}
