import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "src/tasks/entities/task.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;


  @Column({select:false})
  password:string;
  
  @Column({default: true})
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @DeleteDateColumn()
  deletedAt: Date;
}
