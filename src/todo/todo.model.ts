import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ITodo } from './todo.interface';

@Entity()
export class Todo implements ITodo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column({ default: false })
  public completed: boolean;

  @Column({ length: 27 })
  public createdAt: string;

  @BeforeInsert()
  public setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
