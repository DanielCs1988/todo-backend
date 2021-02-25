import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public content: string;

  @Column()
  public completed: boolean;

  @Column({ length: 27 })
  public createdAt: string;

  @BeforeInsert()
  public setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
