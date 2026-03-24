import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ForeignKey } from "typeorm";
import { User } from "../../users/entities/user.entity"; // Importe o User

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

    @Column()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}