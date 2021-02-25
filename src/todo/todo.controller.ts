import { Controller, Get } from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }
}
