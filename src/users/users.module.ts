import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersProvider } from './providers/users';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider, UsersCreateManyProvider, CreateUserProvider,
    // {
  //   provide:APP_GUARD,
  //   useClass:AccessTokenGuard
  // }
  ],
  exports: [UsersProvider],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
    // ConfigModule.forFeature(jwtConfig), //makes the config available for di
    // JwtModule.registerAsync(jwtConfig.asProvider()), // use the injected config to set up the config service
  ],
})
export class UsersModule {}
