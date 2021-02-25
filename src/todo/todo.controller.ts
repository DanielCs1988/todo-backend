import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getOne(id);
  }

  @Post()
  public async create(@Body() todo: TodoDto): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Post(':id')
  public async toggleCompleted(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.toggleCompleted(id);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  public async delete(@Param() id: number): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
