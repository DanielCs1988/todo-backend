import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>
  ) {}

  public async getAll(): Promise<Todo[]> {
    return this.repository.find();
  }
}
