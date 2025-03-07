import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-options.entity';
import { MetaOptionProvider } from './providers/meta-option';

@Module({
  controllers: [MetaOptionsController],
  providers:[MetaOptionProvider],
  imports:[TypeOrmModule.forFeature([MetaOption])]
})
export class MetaOptionsModule {}
