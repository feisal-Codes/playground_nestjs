import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagsController } from './tags.controller';
import { TagProvider } from './provider/tags.provider';

@Module({
    controllers: [TagsController],
    providers:[TagProvider],
    imports:[TypeOrmModule.forFeature([Tag])]

})
export class TagsModule {

}
