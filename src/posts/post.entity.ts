import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postStatus.enum";
import { CreateMetaOptionsDTO } from "./dto/create-metaOption.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:string;
    @Column({
        nullable:false,
        length:100,
        type:"varchar"

    })
    title: string;

    @Column({
        nullable:false,
        
        type:"enum",
        enum:postType

    })
    postType: postType;

    @Column({
        nullable:false,
        length:100,
        type:"varchar",
        unique :true

    })
    slug: string;

    @Column({
        nullable:false,
        type:"enum",
        enum:postStatus

    })
    status: postStatus;

    @Column({
        nullable:true,
        length:100,
        type:"varchar"

    })
    content?: string;

    @Column({
        nullable:false,
        length:100,
        type:"varchar"

    })
    
    schema?: string;

    @Column({
        nullable:true,
        length:100,
        type:"varchar"

    })
    
    featuredImageUrl?: string;

    @Column({
        nullable:true,
        type:Date

    })
    publishOn: Date;

   
    @Column({
        nullable:true,
        type:"varchar",
        array:true

    })
    tags: string[];

    @Column({
        nullable:true,
        type:"json"

    })
    metaOptions: CreateMetaOptionsDTO[];

}