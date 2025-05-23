import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postStatus.enum";
import { CreateMetaOptionsDTO } from "./dto/create-metaOption.dto";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetaOption } from "src/meta-options/meta-options.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";
import { Comment } from "src/comments/comments.entity";
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number;
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
        type:'timestamp'

    })
    publishOn: Date;

   
    // @Column({
    //     nullable:true,
    //     type:"varchar",
    //     array:true

    // })
    // tags: string[];

   @OneToOne(()=>MetaOption,(metaOption)=>metaOption.post,{
    cascade:true,
    // eager:true
   })
   metaOptions?: MetaOption ;

   @ManyToOne(()=>User, (user)=>user.posts,{
    eager:true
   })
   author: User
   @ManyToMany(()=>Tag)
   @JoinTable()
   tags?: Tag[]

   @OneToMany(()=>Comment,(comment)=>comment.post,{
    cascade:true
   })
   comments:Comment[]

}