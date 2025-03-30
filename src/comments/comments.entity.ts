import { Post } from "src/posts/post.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        length: 250,
        type: "varchar"
    })
    body: string;

    @ManyToOne(() => Post, post => post.comments)
    @JoinColumn() 
    post: Post;
}