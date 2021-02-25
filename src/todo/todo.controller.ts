import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';
import { ITodo } from './todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public async getAll(): Promise<ITodo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<ITodo> {
    return this.todoService.getOne(id);
  }

  @Post()
  public async create(@Body() todo: TodoDto): Promise<ITodo> {
    return this.todoService.create(todo);
  }

  @Post(':id')
  public async toggleCompleted(@Param('id', ParseIntPipe) id: number): Promise<ITodo> {
    return this.todoService.toggleCompleted(id);
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() todo: TodoDto): Promise<ITodo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  public async delete(@Param() id: number): Promise<boolean> {
    return this.todoService.delete(id);
  }
}
