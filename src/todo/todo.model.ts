import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly content: string;

  @Column()
  public readonly completed: boolean;

  @Column({ length: 27 })
  public createdAt: string;

  @BeforeInsert()
  public setCreationDate() {
    this.createdAt = new Date().toISOString();
  }
}
