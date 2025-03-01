import { Module,forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [Auth],
  imports:[forwardRef(()=>UsersModule)],
  exports:[Auth]
})
export class AuthModule {}
