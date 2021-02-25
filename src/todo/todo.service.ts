import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Todo } from './todo.model';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>
  ) {}

  public async getAll(): Promise<Todo[]> {
    return this.repository.find({ order: { createdAt: 'ASC' } });
  }

  public async getOne(id: number): Promise<Todo> {
    return this.repository.findOne(id);
  }

  public async create(todoDto: TodoDto): Promise<Todo> {
    const entity = this.repository.create(todoDto);

    return this.repository.save(entity);
  }

  public async toggleCompleted(id: number): Promise<Todo> {
    const entity = await this.repository.findOne(id);
    entity.completed = !entity.completed;

    return this.repository.save(entity);
  }

  public async update(id: number, todoDto: TodoDto): Promise<Todo> {
    const entity = await this.repository.findOne(id);
    entity.content = todoDto.content;

    return this.repository.save(entity);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);

    return result.affected > 0;
  }
}
