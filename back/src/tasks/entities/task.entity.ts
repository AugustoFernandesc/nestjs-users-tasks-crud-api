import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, DeleteDateColumn } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;

    @Column({nullable: true})
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @DeleteDateColumn()
    deletedAt: Date;
}