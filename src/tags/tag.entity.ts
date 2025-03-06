import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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
    
    @CreateDateColumn()
    
    createdAt:Date;
    
    @UpdateDateColumn()
    updatedAt:Date;
    @DeleteDateColumn()
    deleteDate:Date;
    


}