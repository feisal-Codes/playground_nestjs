import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Tag{
    @PrimaryGeneratedColumn()

    id:string;
    @Column({
        type:"varchar",
        nullable:false
    })
    name:string;
    @Column({
        type:"varchar",
        nullable:false,
        unique:true
    })
    slug:string;
    @Column({
        
        type:"varchar",
        nullable:false,

    })
    description?:string;
    @Column({
        type:'timestamp',

    })


    // @ManyToMany(()=>Post, (post)=>post.tags)
    // posts: Post[]
    
    @CreateDateColumn()
    
    createdAt:Date;
    
    @UpdateDateColumn()
    updatedAt:Date;
    @DeleteDateColumn()
    deleteDate:Date;


    


}