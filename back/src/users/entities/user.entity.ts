import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/tasks/entities/task.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  
  // Define o ID como UUID, conforme as boas práticas para APIs escaláveis
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;
  
  // Garante que não existam dois usuários com o mesmo e-mail no sistema 
  @Column({ unique: true })
  email: string;

  // 'select: false' impede que ela seja retornada em consultas comuns 
  @Column({ select: false })
  password: string;
  
  @Column({ default: true })
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  // Define o relacionamento de um para muitos: um usuário pode ter várias tarefas 
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  // Habilita o suporte para exclusão lógica (soft delete)
  @DeleteDateColumn()
  deletedAt: Date;
}