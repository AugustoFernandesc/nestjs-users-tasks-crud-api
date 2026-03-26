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

    // Armazena a chave estrangeira do usuário (UUID) que é dono desta tarefa
    @Column({ nullable: true })
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    // Define o relacionamento de muitos para um: várias tarefas pertencem a um único usuário 
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    // Habilita o soft delete para exclusão lógica da tarefa
    @DeleteDateColumn()
    deletedAt: Date;
}