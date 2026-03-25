import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/tasks/entities/task.entity";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password:string;
  
  @Column()
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @DeleteDateColumn()
  deletedAt: Date;
}
